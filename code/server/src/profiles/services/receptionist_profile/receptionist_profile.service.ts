import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { CreateReceptionistSuperAdminDto } from 'src/receptionist/dto/create-receptionist-super_admin.dto';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { In, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ReceptionistProfileService {
  constructor(
    private readonly receptionistService: ReceptionistService,
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
  ) {}

  async getReceptionistProfile(user: PayloadInterface) {
    return await this.receptionistService.findReceptionistByIdWithRelationship(
      user.id,
    );
  }

  async updateReceptionistProfile(
    user: PayloadInterface,
    updateReceptionistSuperAdminDto: CreateReceptionistSuperAdminDto,
    profilePhoto: Express.Multer.File,
  ) {
    try {
      const receptionist =
        await this.receptionistService.findReceptionistByIdWithRelationship(
          user.id,
        );

      const { doctorIds, ...extraData } = updateReceptionistSuperAdminDto;

      const currentDoctorIds = receptionist.doctors.map((doctor) => doctor.id);

      const doctorsToAdds = doctorIds.filter(
        (id) => !currentDoctorIds.includes(id),
      );

      const doctorsToRemoves = currentDoctorIds.filter(
        (id) => !doctorIds.includes(id),
      );

      return await this.receptionistRepository.manager.connection.transaction(
        async (transactionalEntityManager) => {
          const receptionist = await transactionalEntityManager.findOneOrFail(
            Receptionist,
            {
              relations: {
                doctors: true,
              },
              where: { id: user.id },
            },
          );

          const doctorsToAdd = await transactionalEntityManager.findBy(Doctor, {
            id: In(doctorsToAdds),
          });

          receptionist.doctors = [...receptionist.doctors, ...doctorsToAdd];

          receptionist.doctors = receptionist.doctors.filter(
            (doctor) => !doctorsToRemoves.includes(doctor.id),
          );

          if (profilePhoto) {
            extraData['profilePhoto'] = profilePhoto.originalname;
          }

          Object.assign(receptionist, extraData);

          return await transactionalEntityManager.save(receptionist);
        },
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          `email is already ${updateReceptionistSuperAdminDto.email} use`,
        );
      }

      if (error?.status === 404) {
        throw new NotFoundException(
          `Receptionist with ID ${user.id} not found`,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

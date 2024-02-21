import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { CreateReceptionistSuperAdminDto } from 'src/receptionist/dto/create-receptionist-super_admin.dto';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { ILike, In, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ReceptionistSuperAdminService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly receptionistService: ReceptionistService,
  ) {}

  async fetchAllReceptionisSuperAdmin(searchQuery: SearchQueryDto) {
    if (searchQuery.search) {
      return await this.receptionistRepository.find({
        where: [
          {
            firstName: ILike(`%${searchQuery.search}%`),
          },
          {
            lastName: ILike(`%${searchQuery.search}%`),
          },
        ],
      });
    }

    return await this.receptionistRepository.find();
  }

  async fetchReceptionistForSuperAdmin(receptionistId: number) {
    return await this.receptionistService.findReceptionistByIdWithRelationship(
      receptionistId,
    );
  }

  async updateReceptionistForSuperAdmin(
    receptionistId: number,
    updateReceptionistSuperAdminDto: CreateReceptionistSuperAdminDto,
    profilePhoto: Express.Multer.File,
  ) {
    try {
      const receptionist =
        await this.receptionistService.findReceptionistByIdWithRelationship(
          receptionistId,
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
              where: { id: receptionistId },
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
          `Receptionist with ID ${receptionistId} not found`,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteReceptionistForSuperAdmin(receptionistId: number) {
    const result = await this.receptionistRepository
      .createQueryBuilder()
      .delete()
      .from('receptionist')
      .where('id = :id', {
        id: receptionistId,
      })
      .execute();

    if (result.affected !== 1) throw new BadRequestException();

    return {
      message: 'Receptionist deleted successfully',
    };
  }

  async getAllAppointmentListDoctorById() {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('appointment.patient', 'patient')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .getMany();
  }
}

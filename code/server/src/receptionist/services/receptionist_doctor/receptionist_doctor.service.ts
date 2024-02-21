import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ReceptionistDoctorService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
    private readonly receptionistService: ReceptionistService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async fetchAllReceptionisDoctor(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const doctor = await this.doctorsService.getDoctorById(user.id);

    if (searchQuery.search) {
      return await this.receptionistRepository
        .createQueryBuilder('receptionist')
        .innerJoinAndSelect('receptionist.doctors', 'doctor')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('receptionist.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('receptionist.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .getMany();
    }

    return await this.receptionistRepository
      .createQueryBuilder('receptionist')
      .innerJoinAndSelect('receptionist.doctors', 'doctor')
      .where('doctor.id = :doctorId', { doctorId: doctor.id })
      .getMany();
  }

  async fetchReceptionistForDoctor(
    user: PayloadInterface,
    receptionistId: number,
  ) {
    try {
      const doctor = await this.doctorsService.getDoctorById(user.id);

      return await this.receptionistRepository
        .createQueryBuilder('receptionist')
        .innerJoinAndSelect('receptionist.doctors', 'doctor')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionistId,
        })
        .getOneOrFail();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

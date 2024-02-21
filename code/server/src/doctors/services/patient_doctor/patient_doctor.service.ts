import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class PatientDoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async fetchAllDoctorForPatient(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    if (searchQuery.search) {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .where(
          new Brackets((qb) => {
            qb.where('doctor.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('doctor.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .groupBy('doctor.id')
        .getMany();
    }

    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .groupBy('doctor.id')
      .getMany();
  }
}

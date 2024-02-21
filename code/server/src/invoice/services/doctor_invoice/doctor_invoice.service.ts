import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class DoctorInvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly doctorsService: DoctorsService,
  ) {}

  async fetchAllInvoicesForDoctor(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const doctor = await this.doctorsService.getDoctorById(user.id);

    if (searchQuery.search) {
      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.patient', 'patient')
        .innerJoinAndSelect('invoice.doctor', 'doctor')
        .innerJoinAndSelect('invoice.appointment', 'appointments')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('patient.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('patient.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .getMany();
    }

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.patient', 'patient')
      .innerJoinAndSelect('invoice.doctor', 'doctor')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .where('doctor.id = :doctorId', {
        doctorId: doctor.id,
      })
      .getMany();
  }

  async fetchAllInvoiceByIdForDoctor(
    user: PayloadInterface,
    invoiceId: number,
  ) {
    try {
      const doctor = await this.doctorsService.getDoctorById(user.id);

      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.doctor', 'doctor')
        .innerJoinAndSelect('doctor.appointment', 'appointments')
        .where('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .andWhere('invoice.id = :invoiceId', {
          invoiceId,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

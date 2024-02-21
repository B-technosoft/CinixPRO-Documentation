import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class PatientInvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly patientsService: PatientsService,
  ) {}

  async fetchAllInvoicesForPatient(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const patient = await this.patientsService.getPatientById(user.id);

    if (searchQuery.search) {
      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.appointment', 'appointments')
        .innerJoinAndSelect('invoice.patient', 'patient')
        .innerJoinAndSelect('invoice.doctor', 'doctor')
        .where('patient.id = :patientId', { patientId: patient.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('doctor.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('doctor.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .getMany();
    }

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .innerJoinAndSelect('invoice.patient', 'patient')
      .innerJoinAndSelect('invoice.doctor', 'doctor')
      .where('patient.id = :patientId', {
        patientId: patient.id,
      })
      .getMany();
  }

  async fetchAllInvoiceByIdForPatient(
    user: PayloadInterface,
    invoiceId: number,
  ) {
    try {
      const patient = await this.patientsService.getPatientById(user.id);

      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.appointment', 'appointments')
        .innerJoinAndSelect('invoice.patient', 'patient')
        .where('patient.id = :patientId', {
          patientId: patient.id,
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

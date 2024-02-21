import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';
import type { Response } from 'express';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Injectable()
export class PrescriptionPatientService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly patientService: PatientsService,
  ) {}

  async fetchAllPrescriptionForPatient(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const patient = await this.patientService.getPatientById(user.id);

    if (searchQuery.search) {
      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.appointment', 'appointment')
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

    return await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.patient', 'patient')
      .innerJoinAndSelect('prescription.doctor', 'doctor')
      .innerJoinAndSelect('prescription.appointment', 'appointment')
      .where('patient.id = :patientId', {
        patientId: patient.id,
      })
      .getMany();
  }

  async fetchPrescriptionByIdForPatient(
    user: PayloadInterface,
    prescriptionId: number,
  ) {
    try {
      const patient = await this.patientService.getPatientById(user.id);

      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .innerJoinAndSelect('prescription.appointment', 'appointment')
        .where('patient.id = :patientId', {
          patientId: patient.id,
        })
        .andWhere('prescription.id = :prescriptionId', {
          prescriptionId: prescriptionId,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getPrescriptionPDF(res: Response, fileName: string) {
    const file = createReadStream(
      join(process.cwd(), 'media', 'prescriptions', fileName),
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(file);
  }
}

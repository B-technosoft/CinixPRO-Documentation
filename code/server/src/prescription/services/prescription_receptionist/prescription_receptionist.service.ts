import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class PrescriptionReceptionistService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly receptionistService: ReceptionistService,
  ) {}

  async fetchAllPrescriptionForReceptionist(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    if (searchQuery.search) {
      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.appointment', 'appointment')
        .innerJoin('doctor.receptionists', 'receptionist')
        .where('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere(
          new Brackets((qb) => {
            qb.where('patient.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            })
              .orWhere('patient.lastName Like :search', {
                search: `%${searchQuery.search}%`,
              })
              .orWhere('doctor.firstName Like :search', {
                search: `%${searchQuery.search}%`,
              })
              .orWhere('doctor.lastName Like :search', {
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
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .getMany();
  }

  async fetchPrescriptionByIdForReceptionist(
    user: PayloadInterface,
    prescriptionId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );

      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.appointment', 'appointment')
        .innerJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere('prescription.id = :prescriptionId', {
          prescriptionId: prescriptionId,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Injectable()
export class ReceptionistDoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly receptionistService: ReceptionistService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async fetchAllDoctorForReceptionist(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    if (searchQuery.search) {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .innerJoin('doctor.receptionists', 'receptionist')
        .leftJoin('doctor.appointment', 'appointment')
        .addSelect([
          'COUNT(CASE WHEN appointment.isComplete = false THEN appointment.id ELSE null END) AS pending_appointment',
          'COUNT(CASE WHEN appointment.isComplete = true THEN appointment.id ELSE null END) AS complete_appointment',
        ])
        .where('receptionist.id  = :id', { id: receptionist.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('doctor.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('doctor.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .groupBy('doctor.id')
        .getRawMany();
    }

    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .innerJoin('doctor.receptionists', 'receptionist')
      .leftJoin('doctor.appointment', 'appointment')
      .addSelect([
        'COUNT(CASE WHEN appointment.isComplete = false THEN appointment.id ELSE null END) AS pending_appointment',
        'COUNT(CASE WHEN appointment.isComplete = true THEN appointment.id ELSE null END) AS complete_appointment',
      ])
      .groupBy('doctor.id')
      .where('receptionist.id  = :id', {
        id: receptionist.id,
      })
      .getRawMany();
  }

  async fatchDoctorByIdForReceptionist(
    user: PayloadInterface,
    doctorId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );

      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .innerJoin('doctor.receptionists', 'receptionist')
        .innerJoinAndSelect('doctor.availableTime', 'availableTimes')
        .innerJoinAndSelect('doctor.availableDays', 'availableDays')
        .where('doctor.id = :doctorId', {
          doctorId,
        })
        .andWhere('receptionist.id  = :id', {
          id: receptionist.id,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getAllAppointmentListDoctorById(
    doctorId: number,
    user: PayloadInterface,
  ) {
    const doctor = await this.doctorsService.getDoctorById(doctorId);

    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('appointment.patient', 'patient')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('doctor.id = :doctorId', { doctorId: doctor.id })
      .andWhere('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .getMany();
  }

  async getAllPrescriptionListDoctorById(
    doctorId: number,
    user: PayloadInterface,
  ) {
    const doctor = await this.doctorsService.getDoctorById(doctorId);

    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    return await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.doctor', 'doctor')
      .innerJoinAndSelect('prescription.patient', 'patient')
      .innerJoinAndSelect('prescription.appointment', 'appointment')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .andWhere('doctor.id = :doctorId', { doctorId: doctor.id })
      .getMany();
  }

  async getAllInvoiceListDoctorById(doctorId: number, user: PayloadInterface) {
    const doctor = await this.doctorsService.getDoctorById(doctorId);

    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.patient', 'patient')
      .innerJoinAndSelect('invoice.doctor', 'doctor')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .andWhere('doctor.id = :doctorId', { doctorId: doctor.id })
      .getMany();
  }
}

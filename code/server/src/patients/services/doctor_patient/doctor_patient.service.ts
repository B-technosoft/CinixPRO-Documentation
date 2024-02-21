import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { PatientsService } from '../patients/patients.service';
import { UpdatePatientSuperAdminDto } from 'src/patients/dto/update-patient-super_admin.dto';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Injectable()
export class DoctorPatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
  ) {}

  async fetchAllPatientListForDoctor(searchQuery: SearchQueryDto) {
    if (searchQuery.search) {
      return await this.patientRepository.find({
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

    return await this.patientRepository.find();
  }

  async fetchPatientByIdForDoctor(patientId: number) {
    return await this.patientsService.getPatientById(patientId);
  }

  async updatePatientForDoctor(
    patientId: number,
    updatePatientSuperAdminDto: UpdatePatientSuperAdminDto,
  ) {
    try {
      const patient = await this.patientsService.getPatientById(patientId);

      Object.assign(patient, updatePatientSuperAdminDto);

      return {
        message: 'Patient  is update successfully',
        result: await this.patientRepository.save(patient),
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          `email is already ${updatePatientSuperAdminDto.email} use`,
        );
      }

      if (error?.status === 404) {
        throw new NotFoundException(`Patient with ID ${patientId} not found`);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePatientForDoctor(patientId: number) {
    const result = await this.patientRepository
      .createQueryBuilder()
      .delete()
      .from('patient')
      .where('id = :id', {
        id: patientId,
      })
      .execute();

    if (result.affected !== 1) throw new BadRequestException();

    return {
      message: 'Patient deleted successfully',
    };
  }

  async getAllAppointmentListPatientByIdForDoctor(
    patientId: number,
    user: PayloadInterface,
  ) {
    const patient = await this.patientsService.getPatientById(patientId);

    const doctor = await this.doctorsService.getDoctorById(user.id);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('patient.id = :patientId', { patientId: patient.id })
      .andWhere('doctor.id = :doctorId', {
        doctorId: doctor.id,
      })
      .getMany();
  }

  async getAllPrescriptionListPatientByIdForDoctor(
    patientId: number,
    user: PayloadInterface,
  ) {
    const patient = await this.patientsService.getPatientById(patientId);

    const doctor = await this.doctorsService.getDoctorById(user.id);

    return await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.doctor', 'doctor')
      .innerJoinAndSelect('prescription.patient', 'patient')
      .innerJoinAndSelect('prescription.appointment', 'appointment')
      .where('doctor.id = :doctorId', {
        doctorId: doctor.id,
      })
      .andWhere('patient.id = :patientId', { patientId: patient.id })
      .getMany();
  }

  async getAllInvoiceListPatientByIdForDoctor(
    patientId: number,
    user: PayloadInterface,
  ) {
    const patient = await this.patientsService.getPatientById(patientId);

    const doctor = await this.doctorsService.getDoctorById(user.id);

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.patient', 'patient')
      .innerJoinAndSelect('invoice.doctor', 'doctor')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .where('doctor.id = :doctorId', {
        doctorId: doctor.id,
      })
      .andWhere('patient.id = :patientId', {
        patientId: patient.id,
      })
      .getMany();
  }
}

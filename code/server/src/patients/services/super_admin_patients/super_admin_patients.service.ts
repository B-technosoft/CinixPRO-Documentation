import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { ILike, QueryFailedError, Repository } from 'typeorm';
import { PatientsService } from '../patients/patients.service';
import { UpdatePatientSuperAdminDto } from 'src/patients/dto/update-patient-super_admin.dto';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Injectable()
export class SuperAdminPatientsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly patientsService: PatientsService,
  ) {}

  async fetchAllPatientListForSuperAdmin(searchQuery: SearchQueryDto) {
    if (searchQuery.search) {
      return await this.patientRepository.find({
        where: [
          { firstName: ILike(`%${searchQuery.search}%`) },
          { lastName: ILike(`%${searchQuery.search}%`) },
        ],
      });
    }

    return await this.patientRepository.find({});
  }

  async fetchPatientByIdForSuperAdmin(patientId: number) {
    return await this.patientsService.getPatientById(patientId);
  }

  async updatePatientForSuperAdmin(
    patientId: number,
    updatePatientSuperAdminDto: UpdatePatientSuperAdminDto,
    profilePhoto: Express.Multer.File,
  ) {
    try {
      const patient = await this.patientsService.getPatientById(patientId);

      if (profilePhoto) {
        UpdatePatientSuperAdminDto['profilePhoto'] = profilePhoto.originalname;
      }

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

  async deletePatientForSuperAdmin(patientId: number) {
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

  async getAllAppointmentListPatientById(patientId: number) {
    const patient = await this.patientsService.getPatientById(patientId);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('appointment.patient', 'patient')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('patient.id = :patientId', { patientId: patient.id })
      .getMany();
  }

  async getAllPrescriptionListPatientById(patientId: number) {
    const patient = await this.patientsService.getPatientById(patientId);

    return await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.doctor', 'doctor')
      .innerJoinAndSelect('prescription.patient', 'patient')
      .innerJoinAndSelect('prescription.appointment', 'appointment')
      .andWhere('patient.id = :patientId', { patientId: patient.id })
      .getMany();
  }

  async getAllInvoiceListPatientById(patientId: number) {
    const patient = await this.patientsService.getPatientById(patientId);

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.patient', 'patient')
      .innerJoinAndSelect('invoice.doctor', 'doctor')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .andWhere('patient.id = :patientId', {
        patientId: patient.id,
      })
      .getMany();
  }
}

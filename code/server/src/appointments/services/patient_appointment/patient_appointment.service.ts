import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentPatientDto } from 'src/appointments/dtos/create-appointment-patient.dto';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { AppointmentDoctorListQuery } from 'src/appointments/interfaces/appointment_doctor_list_query';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';

@Injectable()
export class PatientAppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
  ) {}

  //Patient
  async getAppointmentByIdForPatient(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    try {
      const patient = await this.patientService.getPatientById(user.id);

      return await this.appointmentRepository.findOneOrFail({
        where: { patient, id: appointmentId },
        relations: ['doctor'],
      });
    } catch (error) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }
  }

  async getAllAppointmentsForPatient(
    user: PayloadInterface,
    query: AppointmentDoctorListQuery,
  ) {
    const patient = await this.patientService.getPatientById(user.id);

    if (query.day) {
      return {
        message: `Appointments of ${query.day}`,
        result: await this.appointmentRepository
          .createQueryBuilder('appointment')
          .leftJoinAndSelect('appointment.doctor', 'doctor')
          .leftJoinAndSelect('appointment.patient', 'patient')
          .where('DATE(appointment.appointmentDate) = :day', {
            day: dayjs(query.day).format('YYYY-MM-DD'),
          })
          .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
          .andWhere('appointment.isComplete = :isComplete', {
            isComplete: false,
          })
          .andWhere('patient.id = :patientId', {
            patientId: patient.id,
          })
          .getMany(),
      };
    }

    return {
      message: 'Appointments of List of patient',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.patient', 'patient')
        .where('patient.id = :patientId', { patientId: patient.id })
        .getMany(),
    };
  }

  async getAllAppointmentsTodayForPatient(user: PayloadInterface) {
    const patient = await this.patientService.getPatientById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Today of patient',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.patient', 'patient')
        .where('patient.id = :patientId', { patientId: patient.id })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('DATE(appointment.appointmentDate) = :today', { today })
        .getMany(),
    };
  }

  async getAllAppointmentsForCalender(user: PayloadInterface) {
    const patient = await this.patientService.getPatientById(user.id);

    return {
      message: 'Appointments of List of Patient',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.patient', 'patients')
        .select([
          'appointment.id',
          'appointment.appointmentDate',
          'doctor.id',
          'doctor.firstName',
          'doctor.lastName',
        ])
        .orderBy('appointment.appointmentDate', 'ASC')
        .where('patients.id = :patientId', { patientId: patient.id })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', {
          isComplete: false,
        })
        .getMany(),
    };
  }

  async bookAppointmentByPatient(
    user: PayloadInterface,
    appointmentDto: CreateAppointmentPatientDto,
  ) {
    const patient = await this.patientService.getPatientById(user.id);

    const doctor = await this.doctorService.getDoctorById(
      appointmentDto.doctor,
    );

    const data = {
      ...appointmentDto,
      patient,
      doctor,
    };

    const appointment = this.appointmentRepository.create(data);

    const saveAppointmentResult =
      await this.appointmentRepository.save(appointment);

    return {
      message: 'Appointment is Book By Patient',
      appointment: {
        id: saveAppointmentResult.id,
        appointmentDate: saveAppointmentResult.appointmentDate,
      },
    };
  }

  async cancleAppointmentByPatient(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    const patient = await this.patientService.getPatientById(user.id);

    const result = await this.appointmentRepository
      .createQueryBuilder()
      .update('Appointment')
      .set({
        isCancel: true,
      })
      .where('patient.id = :patientId', { patientId: patient.id })
      .andWhere('isComplete = :isComplete', { isComplete: false })
      .andWhere('appointment.id = :appointmentId', {
        appointmentId: appointmentId,
      })
      .execute();

    if (result.affected !== 1) {
      throw new BadRequestException();
    }

    return {
      message: 'Appointment Cancle successfully',
      result: await this.appointmentRepository.findOne({
        where: {
          id: appointmentId,
          patient: patient,
        },
        relations: ['doctor', 'patient'],
      }),
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDoctorDto } from 'src/appointments/dtos/create-appointment-doctor.dto';
import { UpdateAppointmentDoctorDto } from 'src/appointments/dtos/update-appointment-doctor.dto';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { AppointmentDoctorListQuery } from 'src/appointments/interfaces/appointment_doctor_list_query';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { capitalizeFirstLetter } from 'src/helpers/capitalize';
import { Notification } from 'src/notifications/entities/notification.entity';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';

@Injectable()
export class DoctorAppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
  ) {}

  async getAppointmentByIdForDoctor(user: PayloadInterface, id: number) {
    try {
      const doctor = await this.doctorService.getDoctorById(user.id);

      return await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .where('appointment.id = :appointmentId', { appointmentId: id })
        .andWhere('doctor.id = :doctorId', { doctorId: doctor.id })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getAllAppointmentsByDoctor(
    user: PayloadInterface,
    query: AppointmentDoctorListQuery,
  ) {
    const doctor = await this.doctorService.getDoctorById(user.id);

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
          .andWhere('doctor.id = :doctorId', {
            doctorId: doctor.id,
          })
          .getMany(),
      };
    }

    return {
      message: 'Appointments of List of doctor',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .getMany(),
    };
  }

  async getAllAppointmentsForCalender(user: PayloadInterface) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    return {
      message: 'Appointments of List of doctor',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.patient', 'patients')
        .select([
          'appointment.id',
          'appointment.appointmentDate',
          'patients.id',
          'patients.firstName',
          'patients.lastName',
        ])
        .orderBy('appointment.appointmentDate', 'ASC')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', {
          isComplete: false,
        })
        .getMany(),
    };
  }

  async bookAppointmentByDoctor(
    user: PayloadInterface,
    appointmentDto: CreateAppointmentDoctorDto,
  ) {
    const patient = await this.patientService.getPatientById(
      appointmentDto.patient,
    );

    const doctor = await this.doctorService.getDoctorById(user.id);

    //! check the time slot

    const data = {
      ...appointmentDto,
      patient,
      doctor,
    };

    const appointment = this.appointmentRepository.create(data);

    const saveAppointmentResult =
      await this.appointmentRepository.save(appointment);

    const { appointmentDate, appointmentStartTime, appointmentEndTime } =
      saveAppointmentResult;

    const notification = await this.notificationRepository.create({
      notificationMessage: `Appointment Added by ${capitalizeFirstLetter(
        doctor.firstName,
      )} ${capitalizeFirstLetter(doctor.lastName)}`,
      description: `Apppointment date: ${appointmentDate.getFullYear()}-${appointmentDate.getMonth()}-${appointmentDate.getDate()}, time: ${appointmentStartTime} to ${appointmentEndTime}`,
    });

    notification.patient = [patient];

    await this.notificationRepository.save(notification);

    return {
      message: 'Appointment is Book',
      appointment: saveAppointmentResult,
    };
  }

  async updateAppointmentForDoctor(
    user: PayloadInterface,
    id: number,
    updateData: UpdateAppointmentDoctorDto,
  ) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const patient = await this.patientService.getPatientById(
      updateData.patient,
    );

    const result = await this.appointmentRepository
      .createQueryBuilder()
      .update('Appointment')
      .set({
        patient,
        appointmentDate: updateData.appointmentDate,
      })
      .where('doctor.id = :doctorId', { doctorId: doctor.id })
      .andWhere('appointment.id = :appointmentId', { appointmentId: id })
      .execute();

    if (result.affected !== 1) {
      throw new BadRequestException();
    }

    return {
      message: 'Appointment Update successfully',
      result: await this.appointmentRepository.findOne({
        where: {
          id,
          doctor: doctor,
        },
        relations: ['doctor', 'patient'],
      }),
    };
  }

  async deleteAppointmentForDoctor(user: PayloadInterface, id: number) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const appointmentData = await this.appointmentRepository.findOne({
      where: { doctor, id },
      relations: ['patient'],
    });

    if (!appointmentData) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const removeAppointment =
      await this.appointmentRepository.remove(appointmentData);

    return {
      message: 'Appointment is deleted successfully',
      appointment: removeAppointment,
    };
  }

  async completeDoctorAppointment(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const result = await this.appointmentRepository
      .createQueryBuilder()
      .update('Appointment')
      .set({
        isComplete: true,
        appointmentDate: new Date(),
      })
      .where('doctor.id = :doctorId', { doctorId: doctor.id })
      .andWhere('isCancel = :isCancel', { isCancel: false })
      .andWhere('appointment.id = :appointmentId', {
        appointmentId: appointmentId,
      })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException();
    }

    const appointment = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
        doctor: doctor,
      },
      relations: {
        patient: true,
      },
    });

    const {
      appointmentDate,
      appointmentEndTime,
      appointmentStartTime,
      patient,
    } = appointment;

    const dateInstance = new Date(appointmentDate);

    const notification = await this.notificationRepository.create({
      notificationMessage: `Appointment Completed successfully by ${capitalizeFirstLetter(
        doctor.firstName,
      )} ${capitalizeFirstLetter(doctor.lastName)}`,
      description: `Apppointment date: ${dateInstance.getFullYear()}-${dateInstance.getMonth()}-${dateInstance.getDate()}, time: ${appointmentStartTime} to ${appointmentEndTime}`,
    });

    notification.patient = [patient];

    await this.notificationRepository.save(notification);

    return {
      message: 'Appointment Complete successfully',
      result: appointment,
    };
  }

  async cancelDoctorAppointment(user: PayloadInterface, appointmentId: number) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const result = await this.appointmentRepository
      .createQueryBuilder()
      .update('Appointment')
      .set({
        isCancel: true,
        appointmentDate: new Date(),
      })
      .where('doctor.id = :doctorId', { doctorId: doctor.id })
      .andWhere('isComplete = :isComplete', { isComplete: false })
      .andWhere('appointment.id = :appointmentId', {
        appointmentId: appointmentId,
      })
      .execute();

    if (result.affected !== 1) {
      throw new BadRequestException();
    }

    const appointment = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
        doctor: doctor,
      },
      relations: {
        patient: true,
      },
    });

    const {
      appointmentDate,
      appointmentEndTime,
      appointmentStartTime,
      patient,
    } = appointment;

    const dateInstance = new Date(appointmentDate);

    const notification = await this.notificationRepository.create({
      notificationMessage: `Appointment Cancel by  ${capitalizeFirstLetter(
        doctor.firstName,
      )} ${capitalizeFirstLetter(doctor.lastName)}`,
      description: `Apppointment date: ${dateInstance.getFullYear()}-${dateInstance.getMonth()}-${dateInstance.getDate()}, time: ${appointmentStartTime} to ${appointmentEndTime}`,
    });

    notification.patient = [patient];

    await this.notificationRepository.save(notification);

    return {
      message: 'Appointment Cancel successfully',
      result: await this.appointmentRepository.findOne({
        where: {
          id: appointmentId,
          doctor: doctor,
        },
        relations: ['doctor', 'patient'],
      }),
    };
  }

  async getAllAppointmentsOfToDayForDoctor(user: PayloadInterface) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of today',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('DATE(appointment.appointmentDate) = :today', { today })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsForPatientById(patientId: number) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('patient.id = :patientId', {
        patientId,
      })
      .andWhere('appointment.isComplete = :isComplete', { isComplete: true })
      .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
      .getMany();
  }

  async getAllAppointmentsOfPendingAppointmentForDoctor(
    user: PayloadInterface,
  ) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of pending appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfUpcomingAppointment(user: PayloadInterface) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Upcoming appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.appointmentDate >= :today', { today })
        .andWhere('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfCompleteAppointmentForDoctor(
    user: PayloadInterface,
  ) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Complete appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .where('appointment.isComplete = :isComplete', { isComplete: true })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfCancelAppointmentForDoctor(user: PayloadInterface) {
    const doctor = await this.doctorService.getDoctorById(user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Cancel appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: true })
        .andWhere('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .getMany(),
    };
  }
}

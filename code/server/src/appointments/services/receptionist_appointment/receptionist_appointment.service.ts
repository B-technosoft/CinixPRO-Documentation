import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReceptionistDoctorDto } from 'src/appointments/dtos/create-receptionist-doctor.dto';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';
import { AppointmentDoctorListQuery } from 'src/appointments/interfaces/appointment_doctor_list_query';
import * as dayjs from 'dayjs';

@Injectable()
export class ReceptionistAppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
    private readonly receptionistService: ReceptionistService,
  ) {}

  async getAllAppointmentsForReceptionist(
    user: PayloadInterface,
    query: AppointmentDoctorListQuery,
  ) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    if (query.day) {
      return {
        message: `Appointments of ${query.day}`,
        result: await this.appointmentRepository
          .createQueryBuilder('appointment')
          .leftJoinAndSelect('appointment.doctor', 'doctor')
          .leftJoinAndSelect('appointment.patient', 'patient')
          .innerJoinAndSelect('doctor.receptionists', 'receptionist')
          .where('DATE(appointment.appointmentDate) = :day', {
            day: dayjs(query.day).format('YYYY-MM-DD'),
          })
          .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
          .andWhere('appointment.isComplete = :isComplete', {
            isComplete: false,
          })
          .andWhere('receptionist.id = :receptionistId', {
            receptionistId: receptionist.id,
          })
          .getMany(),
      };
    }

    return await this.appointmentRepository
      .createQueryBuilder('appointments')
      .innerJoinAndSelect('appointments.patient', 'patients')
      .innerJoinAndSelect('appointments.doctor', 'doctors')
      .innerJoinAndSelect('doctors.receptionists', 'receptionist')
      .where('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .getMany();
  }

  async getAllAppointmentsForCalender(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    return {
      message: 'Appointments of List of Receptionist',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.patient', 'patients')
        .innerJoinAndSelect('doctor.receptionists', 'receptionist')
        .select([
          'appointment.id',
          'appointment.appointmentDate',
          'patients.id',
          'patients.firstName',
          'patients.lastName',
          'doctor.id',
          'doctor.firstName',
          'doctor.lastName',
        ])
        .orderBy('appointment.appointmentDate', 'ASC')
        .where('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', {
          isComplete: false,
        })
        .getMany(),
    };
  }

  async bookAppointmentByReceptionist(
    user: PayloadInterface,
    appointmentDto: CreateReceptionistDoctorDto,
  ) {
    const patient = await this.patientService.getPatientById(
      appointmentDto.patient,
    );

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
      message: 'Appointment is Book',
      appointment: {
        id: saveAppointmentResult.id,
        appointmentDate: saveAppointmentResult.appointmentDate,
      },
    };
  }

  async getAllAppointmentsForPatientById(
    user: PayloadInterface,
    patientId: number,
  ) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.patient', 'patient')
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('patient.id = :patientId', {
        patientId,
      })
      .andWhere('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .andWhere('appointment.isComplete = :isComplete', { isComplete: true })
      .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
      .getMany();
  }

  async getAppointmentsByAppointmentById(appointmentId: number) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .where('appointment.id = :appointmentId', {
        appointmentId,
      })
      .getOne();
  }

  async getAllAppointmentsOfToDay(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of today',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('DATE(appointment.appointmentDate) = :today', { today })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfPendingAppointment(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of pending appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfUpcomingAppointment(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Upcoming appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('appointment.appointmentDate >= :today', { today })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfCancelAppointment(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Cancel appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: true })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getMany(),
    };
  }

  async getAllAppointmentsOfCompleteAppointment(user: PayloadInterface) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      message: 'Appointments of Complete appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.isComplete = :isComplete', { isComplete: true })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getMany(),
    };
  }

  async completeAppointmentByReceptionist(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );
      const appointmentToUpdate = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.id = :appointmentId', {
          appointmentId,
        })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getOneOrFail();

      appointmentToUpdate.isComplete = true;

      return await this.appointmentRepository.save(appointmentToUpdate);
    } catch (error) {
      throw new NotFoundException('Appointment not found');
    }
  }

  async cancelAppointmentByReceptionist(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );
      const appointmentToUpdate = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('doctor.receptionists', 'receptionist')
        .where('appointment.id = :appointmentId', {
          appointmentId,
        })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getOneOrFail();

      appointmentToUpdate.isCancel = true;

      return await this.appointmentRepository.save(appointmentToUpdate);
    } catch (error) {
      throw new NotFoundException('Appointment not found');
    }
  }

  async getAppointmentByIdForReceptionist(
    user: PayloadInterface,
    appointmentId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );

      return await this.receptionistRepository
        .createQueryBuilder('receptionist')
        .innerJoinAndSelect('receptionist.doctors', 'doctor')
        .innerJoinAndSelect('doctor.appointment', 'appointment')
        .where('appointment.id = :appointmentId', { appointmentId })
        .andWhere('receptionist.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

@Injectable()
export class SuperAdminAppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async getAppointment(user: PayloadInterface, id: number) {
    try {
      return await this.appointmentRepository.findOneOrFail({
        where: { id },
        relations: ['patient'],
        order: {
          appointmentDate: {
            direction: 'ASC',
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async getAllAppointmentsOfToDay() {
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
        .orderBy('appointment.appointmentDate')
        .getMany(),
    };
  }

  async getAllAppointmentsOfUpcomingAppointment() {
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
        .orderBy('appointment.appointmentDate')
        .getMany(),
    };
  }

  async getAllAppointmentsOfPendingAppointment() {
    console.log('getAllAppointmentsOfPendingAppointment');

    return {
      message: 'Appointments of pending appointment',
      result: await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('appointment.isComplete = :isComplete', { isComplete: false })
        .andWhere('appointment.isCancel = :isCancel', { isCancel: false })
        .orderBy('appointment.appointmentDate')
        .getMany(),
    };
  }

  async getAllAppointmentsOfCompleteAppointment() {
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
        .orderBy('appointment.appointmentDate')
        .getMany(),
    };
  }

  async getAllAppointmentsOfCancelAppointment() {
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
        .orderBy('appointment.appointmentDate')
        .getMany(),
    };
  }

  async cancelAppointmentBySuperAdmin(user: PayloadInterface, id: number) {
    const result = await this.getAppointment(user, id);

    Object.assign(result, { isCancel: true });

    return {
      message: 'Appointment cancelled successfully',
      result: await this.appointmentRepository.save(result),
    };
  }
}

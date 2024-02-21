import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CountsReceptionistService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
    private readonly receptionistService: ReceptionistService,
  ) {}

  async countForReceptionist(user: PayloadInterface) {
    const receptionist =
      await this.receptionistService.findReceptionistByIdWithRelationship(
        user.id,
      );

    const currentDate = new Date();
    const tomorrowDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    tomorrowDate.setHours(0, 0, 0, 0);

    tomorrowDate.setDate(currentDate.getDate() + 1);

    return await this.receptionistRepository
      .createQueryBuilder('receptionist')
      .select([
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date) = :today
          AND appointment.is_complete = 0 AND appointment.is_cancel = 0 
          AND appointment.doctor_id = doctor.id) as todayAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date) = :tomorrow
          AND appointment.is_complete = 0 AND appointment.is_cancel = 0 
          AND appointment.doctor_id = doctor.id) as tomorrowAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date)  >= :today
          AND appointment.is_complete = 0 AND appointment.is_cancel = 0 
          AND appointment.doctor_id = doctor.id) as upcomingAppointments`,
        'COUNT(appointment.id) as totalAppointments',
        'COUNT(DISTINCT doctor.id) as doctors',
        '(SELECT COUNT(*) FROM patient) as patients',
      ])
      .innerJoin('receptionist.doctors', 'doctor')
      .leftJoin('doctor.appointment', 'appointment')
      .where('receptionist.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .setParameter('today', currentDate)
      .setParameter('tomorrow', tomorrowDate)
      .groupBy('doctor.id')
      .getRawOne();
  }

  async countTotalAppointment(user: PayloadInterface) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoin('appointment.doctor', 'doctor')
      .innerJoin('doctor.receptionists', 'receptionist')
      .where('receptionist.id = :receptionistsId', { receptionistsId: user.id })
      .select('COUNT(*)', 'totalAppointments')
      .getRawOne();
  }
}

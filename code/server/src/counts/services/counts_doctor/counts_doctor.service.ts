import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CountsDoctorService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly doctorsService: DoctorsService,
  ) {}

  async countForDoctor(user: PayloadInterface) {
    const doctor = await this.doctorsService.getDoctorById(user.id);

    const currentDate = new Date();
    const tomorrowDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    tomorrowDate.setHours(0, 0, 0, 0);

    tomorrowDate.setDate(currentDate.getDate() + 1);

    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .select([
        '(SELECT COUNT(*) FROM appointment WHERE appointment.doctor_id = :doctorId) as totalAppointments ',
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date) = :today
        AND appointment.is_complete = 0 AND appointment.is_cancel = 0 AND appointment.doctor_id = :doctorId) as todayAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date) = :tomorrow
        AND appointment.is_complete = 0 AND appointment.is_cancel = 0 AND appointment.doctor_id = :doctorId) as tomorrowAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointment_date) >= :today
        AND appointment.is_complete = 0 AND appointment.is_cancel = 0 AND appointment.doctor_id = :doctorId) as upcomingAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE appointment.doctor_id = :doctorId) as appointments`,
        `(SELECT COUNT(*) FROM prescription WHERE prescription.doctor_id = :doctorId) as prescriptions`,
        `(SELECT COUNT(*) FROM invoice WHERE invoice.doctor_id = :doctorId) as invoices`,
        `(SELECT COUNT(*) FROM patient) as patients`,
      ])
      .setParameter('today', currentDate)
      .setParameter('tomorrow', tomorrowDate)
      .setParameter('doctorId', doctor.id)
      .getRawOne();
  }

  async countTodayForDoctor(user: PayloadInterface) {
    const doctor = await this.doctorsService.getDoctorById(user.id);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select([
        '(SELECT COUNT(*) FROM appointment WHERE appointment.doctor = :doctorId) as totalAppointments',
      ])
      .setParameter('doctorId', doctor.id)
      .getRawOne();
  }
}

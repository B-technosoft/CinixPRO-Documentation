import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountsSuperAdminService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async countForSuperAdmin(query: string) {
    if (!query) {
      const doctor = await this.doctorRepository.count();
      const receptionist = await this.receptionistRepository.count();
      const patient = await this.patientRepository.count();

      return {
        doctors: doctor,
        receptionists: receptionist,
        patients: patient,
      };
    }

    const currentDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setDate(currentDate.getDate() + 1);

    currentDate.setHours(0, 0, 0, 0);
    tomorrowDate.setHours(0, 0, 0, 0);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select([
        'COUNT(*) as totalAppointments',
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointmentDate) = :today AND (appointment.isComplete = 0 AND appointment.isCancel = 0)) as todayAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointmentDate) = DATE(DATE_ADD(:today, INTERVAL 1 DAY)) AND (appointment.isComplete = 0  AND appointment.isCancel = 0)) as tomorrowAppointments`,
        `(SELECT COUNT(*) FROM appointment WHERE DATE(appointment.appointmentDate) >= :today AND (appointment.isComplete = 0 AND appointment.isCancel = 0)) as upcomingAppointments`,
      ])
      .setParameter('today', currentDate)
      .setParameter('tomorrow', tomorrowDate)
      .getRawOne();
  }
}

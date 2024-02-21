import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CountsPatientService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly patientsService: PatientsService,
  ) {}

  async countForPatient(user: PayloadInterface) {
    const patient = await this.patientsService.getPatientById(user.id);

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select([
        '(SELECT COUNT(*) FROM appointment WHERE appointment.patient = :patientId AND DATE(appointment.appointmentDate) = :today)  as totalAppointments',
      ])
      .setParameter('today', currentDate)
      .setParameter('patientId', patient.id)
      .getRawOne();
  }

  async countAppointmentsForPatient(user: PayloadInterface) {
    const patient = await this.patientsService.getPatientById(user.id);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('COUNT(appointment.id)', 'totalAppointments')
      .where('appointment.patient = :patientId', { patientId: patient.id })
      .getRawOne();
  }
}

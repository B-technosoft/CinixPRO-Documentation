import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorReceptionistService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly receptionistService: ReceptionistService,
  ) {}

  async getAllAppointmentListReceptionsById(receptionId: number) {
    const receptionist =
      await this.receptionistService.findReceptionistById(receptionId);

    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('appointment.patient', 'patient')
      .innerJoinAndSelect('doctor.receptionists', 'receptionist')
      .where('receptionist.id = :receptionId', { receptionId: receptionist.id })

      .getMany();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async findAppointmentById(id: number) {
    try {
      return await this.appointmentRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

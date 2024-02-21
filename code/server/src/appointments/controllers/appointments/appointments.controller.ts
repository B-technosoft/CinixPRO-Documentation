import { Controller, UseGuards } from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/services/appointments/appointments.service';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('appointments')
@UseGuards(RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
}

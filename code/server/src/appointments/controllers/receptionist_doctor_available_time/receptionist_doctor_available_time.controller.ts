import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReceptionistDoctorAvailableTimeService } from 'src/appointments/services/receptionist_doctor_available_time/receptionist_doctor_available_time.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/appointment/available-time')
@UseGuards(RolesGuard)
export class ReceptionistDoctorAvailableTimeController {
  constructor(
    private readonly receptionistDoctorAvailableTimeService: ReceptionistDoctorAvailableTimeService,
  ) {}

  @Get('/:doctorId')
  @Roles(Role.Receptionist)
  async getPatientDoctorAvailableTime(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.receptionistDoctorAvailableTimeService.getPatientDoctorAvailableTime(
      doctorId,
      appointmentDate,
    );
  }
}

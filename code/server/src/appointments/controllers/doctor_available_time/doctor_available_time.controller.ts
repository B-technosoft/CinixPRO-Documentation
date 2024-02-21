import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { DoctorAvailableTimeService } from 'src/appointments/services/doctor_available_time/doctor_available_time.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/appointment/available-time')
@UseGuards(RolesGuard)
export class DoctorAvailableTimeController {
  constructor(
    private readonly doctorAvailableTimeService: DoctorAvailableTimeService,
  ) {}

  @Get('/')
  @Roles(Role.Doctor)
  async getDoctorAvailableTime(
    @Request() req: any,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.doctorAvailableTimeService.getDoctorAvailableTime(
      req.user,
      appointmentDate,
    );
  }
}

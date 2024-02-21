import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DoctorAvailableDayService } from 'src/appointments/services/doctor_available_day/doctor_available_day.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/appointment/available-day')
@UseGuards(RolesGuard)
export class DoctorAvailableDayController {
  constructor(
    private readonly doctorAvailableDayService: DoctorAvailableDayService,
  ) {}

  @Get('/')
  @Roles(Role.Doctor)
  async getDoctorAvailableDay(@Request() req: any) {
    return await this.doctorAvailableDayService.getDoctorAvailableDay(req.user);
  }
}

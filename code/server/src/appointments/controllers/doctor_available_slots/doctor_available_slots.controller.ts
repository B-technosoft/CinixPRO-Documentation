import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DoctorAvailableSlotsService } from 'src/appointments/services/doctor_available_slots/doctor_available_slots.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/appointment/available-slot')
@UseGuards(RolesGuard)
export class DoctorAvailableSlotsController {
  constructor(
    private readonly doctorAvailableSlotsService: DoctorAvailableSlotsService,
  ) {}

  @Get('/:availableTimeId')
  @Roles(Role.Doctor)
  async getDoctorAvailableSlot(
    @Request() req: any,
    @Param('availableTimeId', ParseIntPipe) availableTimeId: number,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.doctorAvailableSlotsService.getDoctorAvailableSlot(
      req.user,
      availableTimeId,
      appointmentDate,
    );
  }
}

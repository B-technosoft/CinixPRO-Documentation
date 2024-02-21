import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReceptionistDoctorAvailableSlotService } from 'src/appointments/services/receptionist_doctor_available_slot/receptionist_doctor_available_slot.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/appointment/available-slot')
@UseGuards(RolesGuard)
export class ReceptionistDoctorAvailableSlotController {
  constructor(
    private readonly receptionistDoctorAvailableSlotService: ReceptionistDoctorAvailableSlotService,
  ) {}

  @Get('/:doctorId/:availableTimeId')
  @Roles(Role.Receptionist)
  async getPatientDoctorAvailableSlot(
    @Param('availableTimeId', ParseIntPipe) availableTimeId: number,
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.receptionistDoctorAvailableSlotService.getPatientDoctorAvailableSlot(
      doctorId,
      availableTimeId,
      appointmentDate,
    );
  }
}

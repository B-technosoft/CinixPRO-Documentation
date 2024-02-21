import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatientDoctorAvailableSlotService } from 'src/appointments/services/patient_doctor_available_slot/patient_doctor_available_slot.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('patient/appointment/available-slot')
@UseGuards(RolesGuard)
export class PatientDoctorAvailableSlotController {
  constructor(
    private readonly patientDoctorAvailableSlotService: PatientDoctorAvailableSlotService,
  ) {}

  @Get('/:doctorId/:availableTimeId')
  @Roles(Role.Patient)
  async getPatientDoctorAvailableSlot(
    @Param('availableTimeId', ParseIntPipe) availableTimeId: number,
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.patientDoctorAvailableSlotService.getPatientDoctorAvailableSlot(
      doctorId,
      availableTimeId,
      appointmentDate,
    );
  }
}

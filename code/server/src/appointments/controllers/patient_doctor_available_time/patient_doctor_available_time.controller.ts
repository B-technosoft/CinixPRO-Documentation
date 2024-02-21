import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatientDoctorAvailableTimeService } from 'src/appointments/services/patient_doctor_available_time/patient_doctor_available_time.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('patient/appointment/doctor-available-time')
@UseGuards(RolesGuard)
export class PatientDoctorAvailableTimeController {
  constructor(
    private readonly patientDoctorAvailableTimeService: PatientDoctorAvailableTimeService,
  ) {}

  @Get('/:doctorId')
  @Roles(Role.Patient)
  async getPatientDoctorAvailableTime(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Query('appointmentDate') appointmentDate: string,
  ) {
    return await this.patientDoctorAvailableTimeService.getPatientDoctorAvailableTime(
      doctorId,
      appointmentDate,
    );
  }
}

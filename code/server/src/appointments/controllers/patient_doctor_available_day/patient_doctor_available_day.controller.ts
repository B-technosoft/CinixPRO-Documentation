import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PatientDoctorAvailableDayService } from 'src/appointments/services/patient_doctor_available_day/patient_doctor_available_day.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('patient/appointment/doctor-available-day')
@UseGuards(RolesGuard)
export class PatientDoctorAvailableDayController {
  constructor(
    private readonly patientDoctorAvailableDayService: PatientDoctorAvailableDayService,
  ) {}

  @Get('/:doctorId')
  @Roles(Role.Patient)
  async getPatientDoctorAvailableDay(
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return await this.patientDoctorAvailableDayService.getPatientDoctorAvailableDay(
      doctorId,
    );
  }
}

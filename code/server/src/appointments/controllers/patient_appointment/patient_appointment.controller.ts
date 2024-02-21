import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentPatientDto } from 'src/appointments/dtos/create-appointment-patient.dto';
import { PatientAppointmentService } from 'src/appointments/services/patient_appointment/patient_appointment.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('patient/appointment')
@UseGuards(RolesGuard)
export class PatientAppointmentController {
  constructor(
    private readonly patientAppointmentService: PatientAppointmentService,
  ) {}

  @Get('/list')
  @Roles(Role.Patient)
  async getAllAppointmentsForPatient(@Request() req: any, @Query() query: any) {
    return await this.patientAppointmentService.getAllAppointmentsForPatient(
      req.user,
      query,
    );
  }

  @Get('/list/calender')
  @Roles(Role.Patient)
  async getAllAppointmentsForCalender(@Request() req: any) {
    return await this.patientAppointmentService.getAllAppointmentsForCalender(
      req.user,
    );
  }

  @Get('/today')
  @Roles(Role.Patient)
  async getAllAppointmentsTodayForPatient(@Request() req: any) {
    return await this.patientAppointmentService.getAllAppointmentsTodayForPatient(
      req.user,
    );
  }

  @Get('/:id')
  @Roles(Role.Patient)
  async getAppointmentByIdForPatient(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.patientAppointmentService.getAppointmentByIdForPatient(
      req.user,
      appointmentId,
    );
  }

  @Patch('/cancel/:id')
  @Roles(Role.Patient)
  async cancleAppointmentByPatient(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.patientAppointmentService.cancleAppointmentByPatient(
      req.user,
      appointmentId,
    );
  }

  @Post('/book-appointment')
  async bookAppointmentByPatient(
    @Request() req: any,
    @Body() body: CreateAppointmentPatientDto,
  ) {
    return await this.patientAppointmentService.bookAppointmentByPatient(
      req.user,
      body,
    );
  }
}

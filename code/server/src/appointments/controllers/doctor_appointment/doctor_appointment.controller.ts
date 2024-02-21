import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentDoctorDto } from 'src/appointments/dtos/create-appointment-doctor.dto';
import { UpdateAppointmentDoctorDto } from 'src/appointments/dtos/update-appointment-doctor.dto';
import { DoctorAppointmentService } from 'src/appointments/services/doctor_appointment/doctor_appointment.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/appointment')
@UseGuards(RolesGuard)
export class DoctorAppointmentController {
  constructor(
    private readonly doctorAppointmentService: DoctorAppointmentService,
  ) {}

  @Get('/list')
  @Roles(Role.Doctor)
  async getAllAppointmentsByDoctor(@Request() req: any, @Query() query: any) {
    return await this.doctorAppointmentService.getAllAppointmentsByDoctor(
      req.user,
      query,
    );
  }

  @Get('/list/calender')
  @Roles(Role.Doctor)
  async getAllAppointmentsForCalender(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsForCalender(
      req.user,
    );
  }

  @Get('/today')
  @Roles(Role.Doctor)
  async getAllAppointmentsOfToDayForDoctor(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsOfToDayForDoctor(
      req.user,
    );
  }

  @Get('/patient-appointments/:id')
  @Roles(Role.Doctor)
  async getAllAppointmentsForPatientById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.doctorAppointmentService.getAllAppointmentsForPatientById(
      id,
    );
  }

  @Get('/pending-appointment')
  @Roles(Role.Doctor)
  async getAllAppointmentsOfPendingAppointmentForDoctor(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsOfPendingAppointmentForDoctor(
      req.user,
    );
  }

  @Get('/upcoming-appointment')
  @Roles(Role.Doctor)
  async getAllAppointmentsOfUpcomingAppointment(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsOfUpcomingAppointment(
      req.user,
    );
  }

  @Get('/complete-appointment')
  @Roles(Role.Doctor)
  async getAllAppointmentsOfCompleteAppointmentForDoctor(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsOfCompleteAppointmentForDoctor(
      req.user,
    );
  }

  @Get('/cancel-appointment')
  @Roles(Role.Doctor)
  async getAllAppointmentsOfCancelAppointmentForDoctor(@Request() req: any) {
    return await this.doctorAppointmentService.getAllAppointmentsOfCancelAppointmentForDoctor(
      req.user,
    );
  }

  @Get('/:id')
  @Roles(Role.Doctor)
  async getAppointmentByIdForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorAppointmentService.getAppointmentByIdForDoctor(
      req.user,
      id,
    );
  }

  @Post('/book-appointment')
  @Roles(Role.Doctor)
  async bookAppointmentByDoctor(
    @Request() req: any,
    @Body() body: CreateAppointmentDoctorDto,
  ) {
    return await this.doctorAppointmentService.bookAppointmentByDoctor(
      req.user,
      body,
    );
  }

  @Put('/update/:id')
  @Roles(Role.Doctor)
  async updateAppointmentForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAppointmentDoctorDto,
    @Request() req: any,
  ) {
    return await this.doctorAppointmentService.updateAppointmentForDoctor(
      req.user,
      id,
      body,
    );
  }

  @Delete('/delete/:id')
  @Roles(Role.Doctor)
  async deleteAppointmentForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorAppointmentService.deleteAppointmentForDoctor(
      req.user,
      id,
    );
  }

  @Patch('/complete/:id')
  @Roles(Role.Doctor)
  async completeDoctorAppointment(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.doctorAppointmentService.completeDoctorAppointment(
      req.user,
      appointmentId,
    );
  }

  @Patch('/cancel/:id')
  @Roles(Role.Doctor)
  async cancelDoctorAppointment(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.doctorAppointmentService.cancelDoctorAppointment(
      req.user,
      appointmentId,
    );
  }
}

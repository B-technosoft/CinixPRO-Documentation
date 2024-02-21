import {
  Controller,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReceptionistDoctorDto } from 'src/appointments/dtos/create-receptionist-doctor.dto';
import { ReceptionistAppointmentService } from 'src/appointments/services/receptionist_appointment/receptionist_appointment.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/appointment')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class ReceptionistAppointmentController {
  constructor(
    private readonly receptionistAppointmentService: ReceptionistAppointmentService,
  ) {}

  @Get('/list')
  async getAllAppointmentsForReceptionist(
    @Request() req: any,
    @Query() query: any,
  ) {
    return await this.receptionistAppointmentService.getAllAppointmentsForReceptionist(
      req.user,
      query,
    );
  }

  @Get('/list/calender')
  async getAllAppointmentsForCalender(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsForCalender(
      req.user,
    );
  }

  @Get('/today')
  async getAllAppointmentsOfToDayForDoctor(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsOfToDay(
      req.user,
    );
  }

  @Get('/pending-appointment')
  async getAllAppointmentsOfPendingAppointment(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsOfPendingAppointment(
      req.user,
    );
  }

  @Get('/upcoming-appointment')
  async getAllAppointmentsOfUpcomingAppointment(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsOfUpcomingAppointment(
      req.user,
    );
  }

  @Get('/complete-appointment')
  async getAllAppointmentsOfCompleteAppointment(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsOfCompleteAppointment(
      req.user,
    );
  }

  @Get('/cancel-appointment')
  async getAllAppointmentsOfCancelAppointment(@Request() req: any) {
    return await this.receptionistAppointmentService.getAllAppointmentsOfCancelAppointment(
      req.user,
    );
  }

  @Get('/:id')
  async getAppointmentByIdForReceptionist(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.receptionistAppointmentService.getAppointmentByIdForReceptionist(
      req.user,
      appointmentId,
    );
  }

  @Get('/patient-appointments/:id')
  async getAllAppointmentsForPatientById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistAppointmentService.getAllAppointmentsForPatientById(
      req.user,
      id,
    );
  }

  @Get('/doctor-appointment/:appointmentId')
  async getAppointmentsByAppointmentById(
    @Param('appointmentId', ParseIntPipe) id: number,
  ) {
    return await this.receptionistAppointmentService.getAppointmentsByAppointmentById(
      id,
    );
  }

  @Post('/book-appointment')
  async bookAppointmentByReceptionist(
    @Request() req: any,
    @Body() body: CreateReceptionistDoctorDto,
  ) {
    return await this.receptionistAppointmentService.bookAppointmentByReceptionist(
      req.user,
      body,
    );
  }

  @Patch('/complete/:id')
  async completeAppointmentByReceptionist(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.receptionistAppointmentService.completeAppointmentByReceptionist(
      req.user,
      appointmentId,
    );
  }

  @Patch('/cancel/:id')
  async cancelAppointmentByReceptionist(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Request() req: any,
  ) {
    return await this.receptionistAppointmentService.cancelAppointmentByReceptionist(
      req.user,
      appointmentId,
    );
  }
}

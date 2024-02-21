import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SuperAdminAppointmentsService } from 'src/appointments/services/super_admin_appointments/super_admin_appointments.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('super-admin/appointment')
@UseGuards(RolesGuard)
export class SuperAdminAppointmentsController {
  constructor(
    private readonly superAdminAppointmentsService: SuperAdminAppointmentsService,
  ) {}

  @Get('/today')
  @Roles(Role.SuperAdmin)
  async getAllAppointmentsOfToDay() {
    return await this.superAdminAppointmentsService.getAllAppointmentsOfToDay();
  }

  @Get('/pending-appointment')
  @Roles(Role.SuperAdmin)
  async getAllAppointmentsOfPendingAppointment() {
    return await this.superAdminAppointmentsService.getAllAppointmentsOfPendingAppointment();
  }

  @Get('/upcoming-appointment')
  @Roles(Role.SuperAdmin)
  async getAllAppointmentsOfUpcomingAppointment() {
    return await this.superAdminAppointmentsService.getAllAppointmentsOfUpcomingAppointment();
  }

  @Get('/complete-appointment')
  @Roles(Role.SuperAdmin)
  async getAllAppointmentsOfCompleteAppointment() {
    return await this.superAdminAppointmentsService.getAllAppointmentsOfCompleteAppointment();
  }

  @Get('/cancel-appointment')
  @Roles(Role.SuperAdmin)
  async getAllAppointmentsOfCancelAppointment() {
    return await this.superAdminAppointmentsService.getAllAppointmentsOfCancelAppointment();
  }

  @Get('/:id')
  @Roles(Role.SuperAdmin)
  async getAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.superAdminAppointmentsService.getAppointment(
      req.user,
      id,
    );
  }

  @Patch('/cancel/:id')
  @Roles(Role.SuperAdmin)
  async cancelAppointmentBySuperAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.superAdminAppointmentsService.cancelAppointmentBySuperAdmin(
      req.user,
      id,
    );
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CountsPatientService } from 'src/counts/services/counts_patient/counts_patient.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('patient/counts')
@UseGuards(RolesGuard)
@Roles(Role.Patient)
export class CountsPatientController {
  constructor(private readonly countsPatientService: CountsPatientService) {}

  @Get('/')
  async countAppointmentsForPatient(@Request() req: any) {
    return await this.countsPatientService.countAppointmentsForPatient(
      req.user,
    );
  }
}

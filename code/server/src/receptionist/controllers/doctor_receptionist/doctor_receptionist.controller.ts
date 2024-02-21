import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CountsReceptionistService } from 'src/counts/services/counts_receptionist/counts_receptionist.service';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { DoctorReceptionistService } from 'src/receptionist/services/doctor_receptionist/doctor_receptionist.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/receptionist')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class DoctorReceptionistController {
  constructor(
    private readonly doctorReceptionistService: DoctorReceptionistService,
    private readonly countsReceptionistService: CountsReceptionistService,
    private readonly receptionistService: ReceptionistService,
  ) {}

  @Get('/appointment-list/:id')
  async getAllAppointmentListReceptionsById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorReceptionistService.getAllAppointmentListReceptionsById(
      id,
    );
  }

  @Get('/count/:id')
  async getCountReceptionsById(@Param('id', ParseIntPipe) id: number) {
    const receptionis = await this.receptionistService.findReceptionistById(id);

    return await this.countsReceptionistService.countTotalAppointment(
      receptionis as any,
    );
  }
}

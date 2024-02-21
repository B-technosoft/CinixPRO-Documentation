import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CountsDoctorService } from 'src/counts/services/counts_doctor/counts_doctor.service';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { ReceptionistDoctorService } from 'src/doctors/services/receptionist_doctor/receptionist_doctor.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/doctor')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class ReceptionistDoctorController {
  constructor(
    private readonly receptionistDoctorService: ReceptionistDoctorService,
    private readonly doctorsService: DoctorsService,
    private readonly countsDoctorService: CountsDoctorService,
  ) {}

  @Get('/all-list')
  async fetchAllDoctotListForSuperAdmin() {
    return await this.doctorsService.doctorList();
  }

  @Get('/list')
  async fetchAllDoctorForReceptionist(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.receptionistDoctorService.fetchAllDoctorForReceptionist(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async fatchDoctorByIdForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe) doctorId: number,
  ) {
    return await this.receptionistDoctorService.fatchDoctorByIdForReceptionist(
      req.user,
      doctorId,
    );
  }

  @Get('/count/:id')
  async getCountDoctorById(@Param('id', ParseIntPipe) id: number) {
    const doctorId = await this.doctorsService.getDoctorById(id);

    return await this.countsDoctorService.countTodayForDoctor(doctorId as any);
  }

  @Get('/appointment-list/:id')
  async getAllAppointmentListDoctorById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistDoctorService.getAllAppointmentListDoctorById(
      id,
      req.user,
    );
  }

  @Get('/prescription-list/:id')
  async getAllPrescriptionListDoctorById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistDoctorService.getAllPrescriptionListDoctorById(
      id,
      req.user,
    );
  }

  @Get('/invoice-list/:id')
  async getAllInvoiceListDoctorById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistDoctorService.getAllInvoiceListDoctorById(
      id,
      req.user,
    );
  }
}

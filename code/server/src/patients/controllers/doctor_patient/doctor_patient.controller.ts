import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CountsPatientService } from 'src/counts/services/counts_patient/counts_patient.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { DoctorPatientDto } from 'src/patients/dto/doctor-patient.dto';
import { UpdatePatientSuperAdminDto } from 'src/patients/dto/update-patient-super_admin.dto';
import { DoctorPatientService } from 'src/patients/services/doctor_patient/doctor_patient.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { SerializeInterceptor } from 'src/users/interceptors/serialize.interceptor';

@Controller('doctor/patient')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class DoctorPatientController {
  constructor(
    private readonly doctorPatientService: DoctorPatientService,
    private readonly patientsService: PatientsService,
    private readonly countsPatientService: CountsPatientService,
  ) {}

  @Get('/list')
  @UseInterceptors(new SerializeInterceptor(DoctorPatientDto))
  async fetchAllPatientListForDoctor(@Query() search: SearchQueryDto) {
    return await this.doctorPatientService.fetchAllPatientListForDoctor(search);
  }

  @Get('/:id')
  async fetchPatientByIdForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.doctorPatientService.fetchPatientByIdForDoctor(patientId);
  }

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: 'media/patients',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async createPatient(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body() body: CreatePatientDto,
  ) {
    return await this.patientsService.createPatient(profilePhoto, body);
  }

  @Put('/update/:id')
  async updatePatientForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
    @Body() body: UpdatePatientSuperAdminDto,
  ) {
    return await this.doctorPatientService.updatePatientForDoctor(
      patientId,
      body,
    );
  }

  @Get('/count/:id')
  async getCountPatientByIdForDoctor(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.getPatientById(id);

    return await this.countsPatientService.countAppointmentsForPatient(
      patient as any,
    );
  }

  @Get('/appointment-list/:id')
  async getAllAppointmentListPatientByIdForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorPatientService.getAllAppointmentListPatientByIdForDoctor(
      id,
      req.user,
    );
  }

  @Get('/prescription-list/:id')
  async getAllPrescriptionListPatientByIdForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorPatientService.getAllPrescriptionListPatientByIdForDoctor(
      id,
      req.user,
    );
  }

  @Get('/invoice-list/:id')
  async getAllInvoiceListPatientByIdForDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.doctorPatientService.getAllInvoiceListPatientByIdForDoctor(
      id,
      req.user,
    );
  }

  @Delete('/delete/:id')
  async deletePatientForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.doctorPatientService.deletePatientForDoctor(patientId);
  }
}

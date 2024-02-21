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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdatePatientSuperAdminDto } from 'src/patients/dto/update-patient-super_admin.dto';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { SuperAdminPatientsService } from 'src/patients/services/super_admin_patients/super_admin_patients.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { RegisterPatientDto } from 'src/patients/dto/register-patient.dto';
import { CountsPatientService } from 'src/counts/services/counts_patient/counts_patient.service';

@Controller('super-admin/patient')
@UseGuards(RolesGuard)
@Roles(Role.SuperAdmin)
export class SuperAdminPatientsController {
  constructor(
    private readonly superAdminPatientsService: SuperAdminPatientsService,
    private readonly patientsService: PatientsService,
    private readonly countsPatientService: CountsPatientService,
  ) {}

  @Post('register')
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
  async registerPatient(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body() body: RegisterPatientDto,
  ) {
    return await this.patientsService.registerPatient(profilePhoto, body);
  }

  @Get('/list')
  async fetchAllPatientListForSuperAdmin(@Query() search: SearchQueryDto) {
    return await this.superAdminPatientsService.fetchAllPatientListForSuperAdmin(
      search,
    );
  }

  @Put('/update/:id')
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
  async updatePatientForSuperAdmin(
    @Param('id', ParseIntPipe)
    patientId: number,
    @Body() body: UpdatePatientSuperAdminDto,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.superAdminPatientsService.updatePatientForSuperAdmin(
      patientId,
      body,
      profilePhoto,
    );
  }

  @Delete('/delete/:id')
  async deletePatientForSuperAdmin(
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.superAdminPatientsService.deletePatientForSuperAdmin(
      patientId,
    );
  }

  @Get('/appointment-list/:id')
  async getAllAppointmentListPatientById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.superAdminPatientsService.getAllAppointmentListPatientById(
      id,
    );
  }

  @Get('/prescription-list/:id')
  async getAllPrescriptionListPatientById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.superAdminPatientsService.getAllPrescriptionListPatientById(
      id,
    );
  }

  @Get('/invoice-list/:id')
  async getAllInvoiceListPatientById(@Param('id', ParseIntPipe) id: number) {
    return await this.superAdminPatientsService.getAllInvoiceListPatientById(
      id,
    );
  }

  @Get('/count/:id')
  async getCountPatientById(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.getPatientById(id);

    return await this.countsPatientService.countAppointmentsForPatient(
      patient as any,
    );
  }

  @Get('/:id')
  async fetchPatientByIdForSuperAdmin(
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.superAdminPatientsService.fetchPatientByIdForSuperAdmin(
      patientId,
    );
  }
}

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
import { UpdatePatientSuperAdminDto } from 'src/patients/dto/update-patient-super_admin.dto';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { ReceptionistPatientService } from 'src/patients/services/receptionist_patient/receptionist_patient.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/patient')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class ReceptionistPatientController {
  constructor(
    private readonly receptionistPatientService: ReceptionistPatientService,
    private readonly patientsService: PatientsService,
    private readonly countsPatientService: CountsPatientService,
  ) {}

  @Get('/list')
  async fetchAllPatientListForReceptionist(@Query() search: SearchQueryDto) {
    return await this.receptionistPatientService.fetchAllPatientListForReceptionist(
      search,
    );
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

  @Get('/:id')
  async fetchPatientByIdForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.receptionistPatientService.fetchPatientByIdForReceptionist(
      patientId,
    );
  }

  @Put('/update/:id')
  async updatePatientForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
    @Body() body: UpdatePatientSuperAdminDto,
  ) {
    return await this.receptionistPatientService.updatePatientForReceptionist(
      patientId,
      body,
    );
  }

  @Delete('/delete/:id')
  async deletePatientForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.receptionistPatientService.deletePatientForReceptionist(
      patientId,
    );
  }

  @Get('/appointment-list/:id')
  async getAllAppointmentListPatientById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistPatientService.getAllAppointmentListPatientById(
      id,
      req.user,
    );
  }

  @Get('/count/:id')
  async getCountPatientByIdForDoctor(@Param('id', ParseIntPipe) id: number) {
    const patientId = await this.patientsService.getPatientById(id);

    return await this.countsPatientService.countAppointmentsForPatient(
      patientId as any,
    );
  }

  @Get('/prescription-list/:id')
  async getAllPrescriptionListPatientById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistPatientService.getAllPrescriptionListPatientById(
      id,
      req.user,
    );
  }

  @Get('/invoice-list/:id')
  async getAllInvoiceListPatientById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistPatientService.getAllInvoiceListPatientById(
      id,
      req.user,
    );
  }
}

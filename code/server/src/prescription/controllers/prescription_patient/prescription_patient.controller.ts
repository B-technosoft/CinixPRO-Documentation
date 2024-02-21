import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PrescriptionPatientService } from 'src/prescription/services/prescription_patient/prescription_patient.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('patient/prescription')
@UseGuards(RolesGuard)
@Roles(Role.Patient)
export class PrescriptionPatientController {
  constructor(
    private readonly prescriptionDoctorService: PrescriptionPatientService,
  ) {}

  @Get('/send-pdf/:fileName')
  async getPrescriptionPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ) {
    return await this.prescriptionDoctorService.getPrescriptionPDF(
      res,
      fileName,
    );
  }

  @Get('/list')
  async fetchAllPrescriptionForPatient(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.prescriptionDoctorService.fetchAllPrescriptionForPatient(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async fetchPrescriptionByIdForPatient(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.prescriptionDoctorService.fetchPrescriptionByIdForPatient(
      req.user,
      id,
    );
  }
}

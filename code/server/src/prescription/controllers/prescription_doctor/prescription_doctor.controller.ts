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
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreatePrescriptionDto } from 'src/prescription/dto/create-prescription.dto';
import { UpdatePrescriptionDto } from 'src/prescription/dto/update-prescription.dto';
import { PrescriptionDoctorService } from 'src/prescription/services/prescription_doctor/prescription_doctor.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { PrescriptionPdfService } from 'src/prescription/services/prescription_pdf/prescription_pdf.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('doctor/prescription')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class PrescriptionDoctorController {
  constructor(
    private readonly prescriptionDoctorService: PrescriptionDoctorService,
    private readonly prescriptionPdfService: PrescriptionPdfService,
  ) {}

  @Get('/send-pdf/:fileName')
  async getPrescriptionPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ) {
    return await this.prescriptionPdfService.getPrescriptionPDF(res, fileName);
  }

  @Get('/list')
  async fetchAllPrescriptionForDoctor(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.prescriptionDoctorService.fetchAllPrescriptionForDoctor(
      req.user,
      search,
    );
  }

  @Post('/create')
  async createPrescriptionForDoctor(
    @Request() req: any,
    @Body() body: CreatePrescriptionDto,
  ) {
    return await this.prescriptionDoctorService.createPrescriptionForDoctor(
      req.user,
      body,
    );
  }

  @Get('/:id')
  async fetchPrescriptionByIdForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.prescriptionDoctorService.fetchPrescriptionByIdForDoctor(
      req.user,
      id,
    );
  }

  @Put('/update/:id')
  async updatePrescriptionByIdForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePrescriptionDto,
  ) {
    return await this.prescriptionDoctorService.updatePrescriptionByIdForDoctor(
      req.user,
      id,
      body,
    );
  }

  @Delete('/delete/:id')
  async deletePrescriptionByIdForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.prescriptionDoctorService.deletePrescriptionByIdForDoctor(
      req.user,
      id,
    );
  }
}

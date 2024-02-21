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
import { PrescriptionReceptionistService } from 'src/prescription/services/prescription_receptionist/prescription_receptionist.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { PrescriptionPdfService } from 'src/prescription/services/prescription_pdf/prescription_pdf.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('receptionist/prescription')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class PrescriptionReceptionistController {
  constructor(
    private readonly prescriptionReceptionistService: PrescriptionReceptionistService,
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
  async fetchAllPrescriptionForReceptionist(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.prescriptionReceptionistService.fetchAllPrescriptionForReceptionist(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async fetchPrescriptionByIdForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.prescriptionReceptionistService.fetchPrescriptionByIdForReceptionist(
      req.user,
      id,
    );
  }
}

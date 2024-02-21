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
import { PatientInvoiceService } from 'src/invoice/services/patient_invoice/patient_invoice.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { InvoicePdfService } from 'src/invoice/services/invoice_pdf/invoice_pdf.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('patient/invoice')
@UseGuards(RolesGuard)
@Roles(Role.Patient)
export class PatientInvoiceController {
  constructor(
    private readonly patientInvoiceService: PatientInvoiceService,
    private readonly invoicePdfService: InvoicePdfService,
  ) {}

  @Get('/list')
  async fetchAllInvoicesForPatient(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.patientInvoiceService.fetchAllInvoicesForPatient(
      req.user,
      search,
    );
  }

  @Get('/send-pdf/:fileName')
  async getPrescriptionPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ) {
    return await this.invoicePdfService.getInvoicePDF(res, fileName);
  }

  @Get('/:id')
  async fetchAllInvoiceByIdForPatient(
    @Request() req: any,
    @Param('id', ParseIntPipe) invoiceId: number,
  ) {
    return await this.patientInvoiceService.fetchAllInvoiceByIdForPatient(
      req.user,
      invoiceId,
    );
  }
}

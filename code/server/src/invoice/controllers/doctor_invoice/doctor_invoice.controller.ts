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
import { DoctorInvoiceService } from 'src/invoice/services/doctor_invoice/doctor_invoice.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { InvoicePdfService } from 'src/invoice/services/invoice_pdf/invoice_pdf.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('doctor/invoice')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class DoctorInvoiceController {
  constructor(
    private readonly doctorInvoiceService: DoctorInvoiceService,
    private readonly invoicePdfService: InvoicePdfService,
  ) {}

  @Get('/send-pdf/:fileName')
  async getPrescriptionPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ) {
    return await this.invoicePdfService.getInvoicePDF(res, fileName);
  }

  @Get('/list')
  async fetchAllInvoicesForDoctor(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.doctorInvoiceService.fetchAllInvoicesForDoctor(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async fetchAllInvoiceByIdForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe) invoiceId: number,
  ) {
    return await this.doctorInvoiceService.fetchAllInvoiceByIdForDoctor(
      req.user,
      invoiceId,
    );
  }
}

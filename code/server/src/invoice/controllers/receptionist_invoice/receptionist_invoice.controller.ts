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
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from 'src/invoice/dto/update-invoice.dto';
import { ReceptionistInvoiceService } from 'src/invoice/services/receptionist_invoice/receptionist_invoice.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import type { Response } from 'express';
import { InvoicePdfService } from 'src/invoice/services/invoice_pdf/invoice_pdf.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Controller('receptionist/invoice')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class ReceptionistInvoiceController {
  constructor(
    private readonly receptionistInvoiceService: ReceptionistInvoiceService,
    private readonly invoicePdfService: InvoicePdfService,
  ) {}

  @Post('/create')
  async createInvoiceForReceptionist(
    @Body()
    createInvoiceDto: CreateInvoiceDto,
  ) {
    return await this.receptionistInvoiceService.createInvoiceForReceptionist(
      createInvoiceDto,
    );
  }

  @Get('/send-pdf/:fileName')
  async getPrescriptionPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ) {
    return await this.invoicePdfService.getInvoicePDF(res, fileName);
  }

  @Get('/list')
  async findAllInvoicesForReceptionist(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.receptionistInvoiceService.findAllInvoicesForReceptionist(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async findInvoiceByIdForReceptionist(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.receptionistInvoiceService.findInvoiceByIdForReceptionist(
      req.user,
      id,
    );
  }

  @Put('/update/:id')
  async updateInvoiceForReceptionist(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return await this.receptionistInvoiceService.updateInvoiceForReceptionist(
      id,
      updateInvoiceDto,
    );
  }

  @Delete('delete/:id')
  async removeInvoiceForReceptionist(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.receptionistInvoiceService.removeInvoiceForReceptionist(
      id,
      req.user,
    );
  }
}

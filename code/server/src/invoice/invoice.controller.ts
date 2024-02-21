import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('/create')
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Get('/')
  async findAllInvoices() {
    return await this.invoiceService.findAllInvoices();
  }

  @Get('/:id')
  async findOneInvoice(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.findOneInvoice(id);
  }

  @Patch('/update/:id')
  async updateInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return await this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @Delete('/delete/:id')
  async removeInvoice(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.removeInvoice(id);
  }
}

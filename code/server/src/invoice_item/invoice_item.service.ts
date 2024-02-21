import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoice_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async createInvoiceItem(createInvoiceItemDto: CreateInvoiceItemDto) {
    const invoiceItem =
      await this.invoiceItemRepository.create(createInvoiceItemDto);

    return await this.invoiceItemRepository.save(invoiceItem);
  }

  async saveInvoiceItem(invoiceItem: CreateInvoiceItemDto) {
    return await this.invoiceItemRepository.save(invoiceItem);
  }

  async deleteInvoiceItem(invoiceItemIds: number[]) {
    return await this.invoiceItemRepository.delete(invoiceItemIds);
  }

  async findInvoiceItemById(id: number) {
    try {
      return await this.invoiceItemRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

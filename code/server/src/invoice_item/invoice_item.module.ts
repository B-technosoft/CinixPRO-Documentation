import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice_item.service';
import { InvoiceItemController } from './invoice_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoice_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItem])],
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
  exports: [InvoiceItemService],
})
export class InvoiceItemModule {}

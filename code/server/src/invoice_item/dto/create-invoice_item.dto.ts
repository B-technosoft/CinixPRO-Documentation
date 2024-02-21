import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Invoice } from 'src/invoice/entities/invoice.entity';

export class CreateInvoiceItemDto {
  @IsNotEmpty()
  invoice: Invoice;

  @IsString()
  itemTitle: string;

  @IsNumber()
  itemAmount: number;
}

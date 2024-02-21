import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceItemWithoutInvoiceDto {
  @IsString()
  itemTitle: string;

  @IsNumber()
  itemAmount: number;
}

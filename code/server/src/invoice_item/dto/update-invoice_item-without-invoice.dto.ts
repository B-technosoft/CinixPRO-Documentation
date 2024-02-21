import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInvoiceItemWithoutInvoiceDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  itemTitle: string;

  @IsNumber()
  itemAmount: number;
}

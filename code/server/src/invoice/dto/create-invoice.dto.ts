import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateInvoiceItemWithoutInvoiceDto } from 'src/invoice_item/dto/create-invoice_item-without-invoice.dto';

export class CreateInvoiceDto {
  @IsNumber()
  patientId: number;

  @IsNumber()
  appointmentId: number;

  @IsNumber()
  doctorId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemWithoutInvoiceDto)
  invoiceItems: CreateInvoiceItemWithoutInvoiceDto[];

  @IsString()
  paymentMode: string;

  @IsString()
  paymentStatus: string;
}

import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UpdateInvoiceItemWithoutInvoiceDto } from 'src/invoice_item/dto/update-invoice_item-without-invoice.dto';

export class UpdateInvoiceDto {
  @IsNumber()
  patientId: number;

  @IsNumber()
  appointmentId: number;

  @IsNumber()
  doctorId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInvoiceItemWithoutInvoiceDto)
  invoiceItems: UpdateInvoiceItemWithoutInvoiceDto[];

  @IsString()
  paymentMode: string;

  @IsString()
  paymentStatus: string;
}

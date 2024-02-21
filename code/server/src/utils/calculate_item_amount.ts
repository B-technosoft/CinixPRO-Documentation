import { InvoiceItem } from 'src/invoice_item/entities/invoice_item.entity';

export const calculateItemAmount = (invoiceItems: InvoiceItem[]) =>
  invoiceItems
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.itemAmount,
      0,
    )
    .toFixed(2);

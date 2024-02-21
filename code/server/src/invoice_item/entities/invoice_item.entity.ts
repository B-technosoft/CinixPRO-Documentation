import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice: Invoice) => invoice.invoiceItem, {
    onDelete: 'CASCADE',
    nullable: false,
    cascade: true,
  })
  invoice: Invoice;

  @Column({
    name: 'item_title',
    nullable: false,
  })
  itemTitle: string;

  @Column({
    name: 'item_amount',
    nullable: false,
  })
  itemAmount: number;
}

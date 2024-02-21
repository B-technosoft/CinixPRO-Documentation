import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { InvoiceItemModule } from 'src/invoice_item/invoice_item.module';
import { DoctorInvoiceController } from './controllers/doctor_invoice/doctor_invoice.controller';
import { DoctorInvoiceService } from './services/doctor_invoice/doctor_invoice.service';
import { PatientInvoiceController } from './controllers/patient_invoice/patient_invoice.controller';
import { PatientInvoiceService } from './services/patient_invoice/patient_invoice.service';
import { ReceptionistInvoiceController } from './controllers/receptionist_invoice/receptionist_invoice.controller';
import { ReceptionistInvoiceService } from './services/receptionist_invoice/receptionist_invoice.service';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { InvoicePdfService } from './services/invoice_pdf/invoice_pdf.service';
import { InvoiceItem } from 'src/invoice_item/entities/invoice_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, InvoiceItem]),
    PatientsModule,
    AppointmentsModule,
    DoctorsModule,
    InvoiceItemModule,
    DoctorsModule,
    ReceptionistModule,
  ],
  controllers: [
    InvoiceController,
    DoctorInvoiceController,
    PatientInvoiceController,
    ReceptionistInvoiceController,
  ],
  providers: [
    InvoiceService,
    DoctorInvoiceService,
    PatientInvoiceService,
    ReceptionistInvoiceService,
    InvoicePdfService,
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}

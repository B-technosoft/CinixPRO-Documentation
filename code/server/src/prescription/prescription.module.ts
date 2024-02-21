import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { PrescriptionMedicineModule } from 'src/prescription_medicine/prescription_medicine.module';
import { TestReportModule } from 'src/test_report/test_report.module';
import { PrescriptionDoctorService } from './services/prescription_doctor/prescription_doctor.service';
import { PrescriptionDoctorController } from './controllers/prescription_doctor/prescription_doctor.controller';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PrescriptionPatientService } from './services/prescription_patient/prescription_patient.service';
import { PrescriptionPatientController } from './controllers/prescription_patient/prescription_patient.controller';
import { PrescriptionReceptionistController } from './controllers/prescription_receptionist/prescription_receptionist.controller';
import { PrescriptionReceptionistService } from './services/prescription_receptionist/prescription_receptionist.service';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { PrescriptionMedicine } from 'src/prescription_medicine/entities/prescription_medicine.entity';
import { TestReport } from 'src/test_report/entities/test_report.entity';
import { PrescriptionPdfService } from './services/prescription_pdf/prescription_pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription, PrescriptionMedicine, TestReport]),
    PatientsModule,
    AppointmentsModule,
    PrescriptionMedicineModule,
    TestReportModule,
    DoctorsModule,
    ReceptionistModule,
  ],
  controllers: [
    PrescriptionController,
    PrescriptionDoctorController,
    PrescriptionPatientController,
    PrescriptionReceptionistController,
  ],
  providers: [
    PrescriptionService,
    PrescriptionDoctorService,
    PrescriptionPatientService,
    PrescriptionReceptionistService,
    PrescriptionPdfService,
  ],
})
export class PrescriptionModule {}

import { Module, forwardRef } from '@nestjs/common';
import { PatientsController } from './controllers/patients/patients.controller';
import { PatientsService } from './services/patients/patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entitys/patient.entity';
import { SuperAdminPatientsService } from './services/super_admin_patients/super_admin_patients.service';
import { SuperAdminPatientsController } from './controllers/super_admin_patients/super_admin_patients.controller';
import { DoctorPatientController } from './controllers/doctor_patient/doctor_patient.controller';
import { DoctorPatientService } from './services/doctor_patient/doctor_patient.service';
import { ReceptionistPatientController } from './controllers/receptionist_patient/receptionist_patient.controller';
import { ReceptionistPatientService } from './services/receptionist_patient/receptionist_patient.service';
import { CountsModule } from 'src/counts/counts.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Appointment, Prescription, Invoice]),
    forwardRef(() => CountsModule),
    forwardRef(() => DoctorsModule),
    forwardRef(() => ReceptionistModule),
    MailModule,
  ],
  controllers: [
    PatientsController,
    SuperAdminPatientsController,
    DoctorPatientController,
    ReceptionistPatientController,
  ],
  providers: [
    PatientsService,
    SuperAdminPatientsService,
    DoctorPatientService,
    ReceptionistPatientService,
  ],
  exports: [PatientsService],
})
export class PatientsModule {}

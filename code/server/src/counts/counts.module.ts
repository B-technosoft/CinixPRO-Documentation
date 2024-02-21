import { Module, forwardRef } from '@nestjs/common';
import { CountsSuperAdminController } from './controllers/counts_super_admin/counts_super_admin.controller';
import { CountsSuperAdminService } from './services/counts_super_admin/counts_super_admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { CountsDoctorController } from './controllers/counts_doctor/counts_doctor.controller';
import { CountsDoctorService } from './services/counts_doctor/counts_doctor.service';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { CountsPatientController } from './controllers/counts_patient/counts_patient.controller';
import { CountsPatientService } from './services/counts_patient/counts_patient.service';
import { PatientsModule } from 'src/patients/patients.module';
import { CountsReceptionistController } from './controllers/counts_receptionist/counts_receptionist.controller';
import { CountsReceptionistService } from './services/counts_receptionist/counts_receptionist.service';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { Patient } from 'src/patients/entitys/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Doctor, Receptionist, Patient]),
    forwardRef(() => DoctorsModule),
    forwardRef(() => PatientsModule),
    forwardRef(() => ReceptionistModule),
  ],
  controllers: [
    CountsSuperAdminController,
    CountsDoctorController,
    CountsPatientController,
    CountsReceptionistController,
  ],
  providers: [
    CountsSuperAdminService,
    CountsDoctorService,
    CountsPatientService,
    CountsReceptionistService,
  ],
  exports: [
    CountsPatientService,
    CountsDoctorService,
    CountsReceptionistService,
  ],
})
export class CountsModule {}

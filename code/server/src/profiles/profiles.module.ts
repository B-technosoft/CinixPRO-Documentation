import { Module } from '@nestjs/common';
import { SuperAdminProfileController } from './controllers/super_admin_profile/super_admin_profile.controller';
import { DoctorProfileController } from './controllers/doctor_profile/doctor_profile.controller';
import { PatientProfileController } from './controllers/patient_profile/patient_profile.controller';
import { ReceptionistProfileController } from './controllers/receptionist_profile/receptionist_profile.controller';
import { ReceptionistProfileService } from './services/receptionist_profile/receptionist_profile.service';
import { SuperAdminProfileService } from './services/super_admin_profile/super_admin_profile.service';
import { PatientProfileService } from './services/patient_profile/patient_profile.service';
import { DoctorProfileService } from './services/doctor_profile/doctor_profile.service';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { SuperAdminsModule } from 'src/super_admins/super_admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { AvailableDayModule } from 'src/available_day/available_day.module';
import { AvailableTime } from 'src/doctors/entitys/available_time.entity';

@Module({
  imports: [
    ReceptionistModule,
    DoctorsModule,
    PatientsModule,
    SuperAdminsModule,
    AvailableDayModule,
    TypeOrmModule.forFeature([Patient, Doctor, Receptionist, AvailableTime]),
  ],
  controllers: [
    SuperAdminProfileController,
    DoctorProfileController,
    PatientProfileController,
    ReceptionistProfileController,
  ],
  providers: [
    ReceptionistProfileService,
    SuperAdminProfileService,
    PatientProfileService,
    DoctorProfileService,
  ],
})
export class ProfilesModule {}

import { Module, forwardRef } from '@nestjs/common';
import { DoctorsController } from './controllers/doctors/doctors.controller';
import { DoctorsService } from './services/doctors/doctors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entitys/doctor.entity';
import { AvailableTime } from './entitys/available_time.entity';
import { SuperAdminDoctorController } from './controllers/super_admin_doctor/super_admin_doctor.controller';
import { SuperAdminDoctorService } from './services/super_admin_doctor/super_admin_doctor.service';
import { PatientDoctorService } from './services/patient_doctor/patient_doctor.service';
import { PatientDoctorController } from './controllers/patient_doctor/patient_doctor.controller';
import { ReceptionistDoctorService } from './services/receptionist_doctor/receptionist_doctor.service';
import { ReceptionistDoctorController } from './controllers/receptionist_doctor/receptionist_doctor.controller';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { AvailableDayModule } from 'src/available_day/available_day.module';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { CountsModule } from 'src/counts/counts.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doctor,
      AvailableTime,
      Appointment,
      Invoice,
      Prescription,
    ]),
    forwardRef(() => ReceptionistModule),
    CountsModule,
    AvailableDayModule,
    MailModule,
  ],
  controllers: [
    DoctorsController,
    SuperAdminDoctorController,
    PatientDoctorController,
    ReceptionistDoctorController,
  ],
  providers: [
    DoctorsService,
    SuperAdminDoctorService,
    PatientDoctorService,
    ReceptionistDoctorService,
  ],
  exports: [DoctorsService],
})
export class DoctorsModule {}

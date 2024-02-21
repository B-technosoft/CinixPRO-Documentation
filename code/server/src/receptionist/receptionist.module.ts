import { Module, forwardRef } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import { ReceptionistController } from './receptionist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptionist } from './entities/receptionist.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ReceptionistSuperAdminService } from './services/receptionist_super_admin/receptionist_super_admin.service';
import { ReceptionistSuperAdminController } from './controllers/receptionist_super_admin/receptionist_super_admin.controller';
import { ReceptionistDoctorService } from './services/receptionist_doctor/receptionist_doctor.service';
import { ReceptionistDoctorController } from './controllers/receptionist_doctor/receptionist_doctor.controller';
import { MailModule } from 'src/mail/mail.module';
import { DoctorReceptionistController } from './controllers/doctor_receptionist/doctor_receptionist.controller';
import { DoctorReceptionistService } from './services/doctor_receptionist/doctor_receptionist.service';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { CountsModule } from 'src/counts/counts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receptionist, Appointment]),
    forwardRef(() => DoctorsModule),
    forwardRef(() => CountsModule),
    MailModule,
  ],
  controllers: [
    ReceptionistController,
    ReceptionistSuperAdminController,
    ReceptionistDoctorController,
    DoctorReceptionistController,
  ],
  providers: [
    ReceptionistService,
    ReceptionistSuperAdminService,
    ReceptionistDoctorService,
    DoctorReceptionistService,
  ],
  exports: [ReceptionistService, DoctorReceptionistService],
})
export class ReceptionistModule {}

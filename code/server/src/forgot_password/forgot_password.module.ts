import { Module } from '@nestjs/common';
import { ForgetPasswordService } from './services/forget_password/forget_password.service';
import { ForgetPasswordController } from './controllers/forget_password/forget_password.controller';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { MailModule } from 'src/mail/mail.module';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { SuperAdminsModule } from 'src/super_admins/super_admins.module';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,
    ReceptionistModule,
    SuperAdminsModule,
    MailModule,
  ],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService],
})
export class ForgotPasswordModule {}

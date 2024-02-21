import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorsModule } from './doctors/doctors.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { User } from './users/entitys/user.entity';
import { Doctor } from './doctors/entitys/doctor.entity';
import { Patient } from './patients/entitys/patient.entity';
import { Appointment } from './appointments/entitys/appointment.entity';
import { SuperAdminsModule } from './super_admins/super_admins.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SuperAdmin } from './super_admins/entitys/super_admin.entity';
import { SpecializationsModule } from './specializations/specializations.module';
import { Specialization } from './specializations/entities/specialization.entity';
import { DegreesModule } from './degrees/degrees.module';
import { Degree } from './degrees/entities/degree.entity';
import { AvailableTime } from './doctors/entitys/available_time.entity';
import { ReceptionistModule } from './receptionist/receptionist.module';
import { Receptionist } from './receptionist/entities/receptionist.entity';
import { PrescriptionMedicineModule } from './prescription_medicine/prescription_medicine.module';
import { PrescriptionMedicine } from './prescription_medicine/entities/prescription_medicine.entity';
import { TestReportModule } from './test_report/test_report.module';
import { TestReport } from './test_report/entities/test_report.entity';
import { PrescriptionModule } from './prescription/prescription.module';
import { Prescription } from './prescription/entities/prescription.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItemModule } from './invoice_item/invoice_item.module';
import { InvoiceItem } from './invoice_item/entities/invoice_item.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './users/guards/auth.guard';
import { AvailableDayModule } from './available_day/available_day.module';
import { AvailableDay } from './available_day/entities/available_day.entity';
import { CountsModule } from './counts/counts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForgotPasswordModule } from './forgot_password/forgot_password.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';
import { ResetPasswordModule } from './reset_password/reset_password.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_HOST'),
          port: configService.get('MAILER_PORT'),
          secure: configService.get('MAILER_SECURE'),
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASS'),
          },
        },
        template: {
          dir: join(__dirname, 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MY_SQL_HOST'),
        port: configService.get<number>('MY_SQL_PORT', 3306),
        username: configService.get<string>('MY_SQL_USERNAME'),
        password: configService.get<string>('MY_SQL_PASSWORD'),
        database: configService.get<string>('MY_SQL_DATABASE'),
        synchronize: true,
        entities: [
          User,
          Doctor,
          Patient,
          Appointment,
          SuperAdmin,
          Specialization,
          Degree,
          AvailableTime,
          Receptionist,
          PrescriptionMedicine,
          TestReport,
          Prescription,
          Invoice,
          InvoiceItem,
          AvailableDay,
          Notification,
        ],
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    DoctorsModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
    SuperAdminsModule,
    SpecializationsModule,
    DegreesModule,
    ReceptionistModule,
    PrescriptionMedicineModule,
    TestReportModule,
    PrescriptionModule,
    InvoiceModule,
    InvoiceItemModule,
    AvailableDayModule,
    CountsModule,
    ProfilesModule,
    ForgotPasswordModule,
    NotificationsModule,
    MailModule,
    ResetPasswordModule,
    PublicModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}

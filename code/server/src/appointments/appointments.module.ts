import { Module } from '@nestjs/common';
import { AppointmentsController } from './controllers/appointments/appointments.controller';
import { AppointmentsService } from './services/appointments/appointments.service';
import { DoctorGuard } from 'src/doctors/guards/doctor.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entitys/appointment.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ReceptionistModule } from 'src/receptionist/receptionist.module';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { SuperAdminAppointmentsController } from './controllers/super_admin_appointments/super_admin_appointments.controller';
import { SuperAdminAppointmentsService } from './services/super_admin_appointments/super_admin_appointments.service';
import { DoctorAppointmentController } from './controllers/doctor_appointment/doctor_appointment.controller';
import { DoctorAppointmentService } from './services/doctor_appointment/doctor_appointment.service';
import { PatientAppointmentService } from './services/patient_appointment/patient_appointment.service';
import { PatientAppointmentController } from './controllers/patient_appointment/patient_appointment.controller';
import { ReceptionistAppointmentController } from './controllers/receptionist_appointment/receptionist_appointment.controller';
import { ReceptionistAppointmentService } from './services/receptionist_appointment/receptionist_appointment.service';
import { DoctorAvailableSlotsService } from './services/doctor_available_slots/doctor_available_slots.service';
import { DoctorAvailableSlotsController } from './controllers/doctor_available_slots/doctor_available_slots.controller';
import { AvailableTime } from 'src/doctors/entitys/available_time.entity';
import { DoctorAvailableDayController } from './controllers/doctor_available_day/doctor_available_day.controller';
import { DoctorAvailableDayService } from './services/doctor_available_day/doctor_available_day.service';
import { DoctorAvailableTimeController } from './controllers/doctor_available_time/doctor_available_time.controller';
import { DoctorAvailableTimeService } from './services/doctor_available_time/doctor_available_time.service';
import { PatientDoctorAvailableDayService } from './services/patient_doctor_available_day/patient_doctor_available_day.service';
import { PatientDoctorAvailableDayController } from './controllers/patient_doctor_available_day/patient_doctor_available_day.controller';
import { PatientDoctorAvailableTimeService } from './services/patient_doctor_available_time/patient_doctor_available_time.service';
import { PatientDoctorAvailableTimeController } from './controllers/patient_doctor_available_time/patient_doctor_available_time.controller';
import { PatientDoctorAvailableSlotController } from './controllers/patient_doctor_available_slot/patient_doctor_available_slot.controller';
import { PatientDoctorAvailableSlotService } from './services/patient_doctor_available_slot/patient_doctor_available_slot.service';
import { Notification } from 'src/notifications/entities/notification.entity';
import { ReceptionistDoctorAvailableTimeController } from './controllers/receptionist_doctor_available_time/receptionist_doctor_available_time.controller';
import { ReceptionistDoctorAvailableTimeService } from './services/receptionist_doctor_available_time/receptionist_doctor_available_time.service';
import { ReceptionistDoctorAvailableSlotController } from './controllers/receptionist_doctor_available_slot/receptionist_doctor_available_slot.controller';
import { ReceptionistDoctorAvailableSlotService } from './services/receptionist_doctor_available_slot/receptionist_doctor_available_slot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Receptionist,
      AvailableTime,
      Notification,
    ]),
    PatientsModule,
    DoctorsModule,
    ReceptionistModule,
  ],
  controllers: [
    AppointmentsController,
    SuperAdminAppointmentsController,
    DoctorAvailableDayController,
    DoctorAvailableTimeController,
    DoctorAppointmentController,
    PatientAppointmentController,
    ReceptionistAppointmentController,
    DoctorAvailableSlotsController,
    PatientDoctorAvailableDayController,
    PatientDoctorAvailableTimeController,
    PatientDoctorAvailableSlotController,
    ReceptionistDoctorAvailableTimeController,
    ReceptionistDoctorAvailableSlotController,
  ],
  providers: [
    DoctorGuard,
    AppointmentsService,
    SuperAdminAppointmentsService,
    DoctorAppointmentService,
    PatientAppointmentService,
    ReceptionistAppointmentService,
    DoctorAvailableSlotsService,
    DoctorAvailableDayService,
    DoctorAvailableTimeService,
    PatientDoctorAvailableDayService,
    PatientDoctorAvailableTimeService,
    PatientDoctorAvailableSlotService,
    ReceptionistDoctorAvailableTimeService,
    ReceptionistDoctorAvailableSlotService,
  ],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}

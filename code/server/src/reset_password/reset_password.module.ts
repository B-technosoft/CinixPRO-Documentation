import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset_password.controller';
import { ResetPasswordService } from './reset_password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Doctor, Receptionist])],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}

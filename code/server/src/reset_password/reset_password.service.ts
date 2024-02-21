import * as bcrypt from 'bcryptjs';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { ResetPasswordDto } from './dtos/reset_password.dto';
import { Role } from 'src/users/enums/role.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Receptionist)
    private readonly receptionistRepository: Repository<Receptionist>,
  ) {}

  async resetPassword({ key, password, confirmPassword }: ResetPasswordDto) {
    try {
      const payload = await this.jwtService.verifyAsync<PayloadInterface>(key, {
        secret: jwtConstants.resetPasswordSecret,
      });

      if (payload.role === Role.Doctor) {
        const doctor = await this.doctorRepository.findOneBy({
          email: payload.email,
          id: payload.id,
        });

        if (!doctor) {
          throw new NotFoundException('Doctor not found');
        }

        if (password !== confirmPassword) {
          throw new UnauthorizedException(
            'Password and Confirm password not match.',
          );
        }

        const saltOrRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        Object.assign(doctor, { password: hashPassword });

        return {
          message: 'Password Reset Successfully',
          role: Role.Doctor,
          result: await this.doctorRepository.save(doctor),
        };
      }

      if (payload.role === Role.Patient) {
        const patient = await this.patientRepository.findOneBy({
          email: payload.email,
          id: payload.id,
        });

        if (!patient) {
          throw new NotFoundException('Patient not found');
        }

        if (password !== confirmPassword) {
          throw new UnauthorizedException(
            'Password and Confirm password not match.',
          );
        }

        const saltOrRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        Object.assign(patient, { password: hashPassword });

        return {
          message: 'Password Reset Successfully',
          role: Role.Patient,
          result: await this.patientRepository.save(patient),
        };
      }

      if (payload.role === Role.Receptionist) {
        const receptionist = await this.receptionistRepository.findOneBy({
          email: payload.email,
          id: payload.id,
        });

        if (!receptionist) {
          throw new NotFoundException('Receptionist not found');
        }

        if (password !== confirmPassword) {
          throw new UnauthorizedException(
            'Password and Confirm password not match.',
          );
        }

        const saltOrRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        Object.assign(receptionist, { password: hashPassword });

        return {
          message: 'Password Reset Successfully',
          role: Role.Receptionist,
          result: await this.receptionistRepository.save(receptionist),
        };
      }

      if (payload.role === Role.SuperAdmin) {
        return {
          message: 'Not Done Yet!',
          role: Role.SuperAdmin,
        };
      }

      throw new InternalServerErrorException();
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }

      if (error.message === 'invalid signature') {
        throw new UnauthorizedException('Invalid');
      }

      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Token Expired');
      }

      throw new InternalServerErrorException();
    }
  }
}

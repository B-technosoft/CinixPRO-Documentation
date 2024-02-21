import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { ForgetPasswordDTO } from 'src/forgot_password/dto/forget_password-dto.dto';
import { capitalizeEveryWord } from 'src/helpers/capitalize';
import { MailService } from 'src/mail/mail.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { SuperAdminsService } from 'src/super_admins/services/super_admins/super_admins.service';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly doctorService: DoctorsService,
    private readonly patientsService: PatientsService,
    private readonly receptionistService: ReceptionistService,
    private readonly superAdminsService: SuperAdminsService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  get #_getJwtSignOptions(): JwtSignOptions {
    return {
      secret: jwtConstants.resetPasswordSecret,
      expiresIn: 3600,
    };
  }

  async superAdminsServiceForgetPassword(body: ForgetPasswordDTO) {
    try {
      const superAdmin = await this.superAdminsService.getSuperAdminByEmail(
        body.email,
      );

      if (!superAdmin) {
        throw new NotFoundException();
      }

      const payload = {
        id: superAdmin.id,
        email: superAdmin.email,
        role: superAdmin.role,
      };

      const token = await this.jwtService.signAsync(
        payload,
        this.#_getJwtSignOptions,
      );

      await this.mailService.sendMail({
        to: superAdmin.email,
        subject: 'Reset Password',
        template: 'reset/reset-password',
        context: {
          username: capitalizeEveryWord(`${superAdmin.name}`),
          resetLink: `${process.env.REACT_ENDPOINT}/reset-password?key=${token}`,
        },
      });

      return {
        message: 'Reset Password send successfully',
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('super Admin Not Found');
      }

      throw new InternalServerErrorException();
    }
  }

  async doctorForgetPassword(body: ForgetPasswordDTO) {
    try {
      const doctor = await this.doctorService.getDoctorByEmail(body.email);

      if (!doctor) {
        throw new NotFoundException();
      }

      const payload = {
        id: doctor.id,
        email: doctor.email,
        role: doctor.role,
      };

      const token = await this.jwtService.signAsync(
        payload,
        this.#_getJwtSignOptions,
      );

      await this.mailService.sendMail({
        to: doctor.email,
        subject: 'Reset Password',
        template: 'reset/reset-password',
        context: {
          username: capitalizeEveryWord(
            `${doctor.firstName} ${doctor.lastName}`,
          ),
          resetLink: `${process.env.REACT_ENDPOINT}/reset-password?key=${token}`,
        },
      });

      return {
        message: 'Reset Password send successfully',
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Doctor Not Found');
      }

      throw new InternalServerErrorException();
    }
  }

  async patientForgetPassword(body: ForgetPasswordDTO) {
    try {
      const patient = await this.patientsService.getPatientByEmail(body.email);

      if (!patient) {
        throw new NotFoundException();
      }

      const payload = {
        id: patient.id,
        email: patient.email,
        role: patient.role,
      };

      const token = await this.jwtService.signAsync(
        payload,
        this.#_getJwtSignOptions,
      );

      await this.mailService.sendMail({
        to: patient.email,
        subject: 'Reset Password',
        template: 'reset/reset-password',
        context: {
          username: capitalizeEveryWord(
            `${patient.firstName} ${patient.lastName}`,
          ),
          resetLink: `${process.env.REACT_ENDPOINT}/reset-password?key=${token}`,
        },
      });

      return {
        message: 'Reset Password send successfully',
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Patient Not Found');
      }

      throw new InternalServerErrorException();
    }
  }

  async receptionistForgetPassword(body: ForgetPasswordDTO) {
    try {
      const receptionist =
        await this.receptionistService.findReceptionistByEmail(body.email);

      if (!receptionist) {
        throw new NotFoundException();
      }

      const payload = {
        id: receptionist.id,
        email: receptionist.email,
        role: receptionist.role,
      };

      const token = await this.jwtService.signAsync(
        payload,
        this.#_getJwtSignOptions,
      );

      await this.mailService.sendMail({
        to: receptionist.email,
        subject: 'Reset Password',
        template: 'reset/reset-password',
        context: {
          username: capitalizeEveryWord(
            `${receptionist.firstName} ${receptionist.lastName}`,
          ),
          resetLink: `${process.env.REACT_ENDPOINT}/reset-password?key=${token}`,
        },
      });

      return {
        message: 'Reset Password send successfully',
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Receptionist Not Found');
      }

      throw new InternalServerErrorException();
    }
  }
}

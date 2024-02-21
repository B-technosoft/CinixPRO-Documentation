import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/users/enums/role.enums';
import { LoginDto } from 'src/users/dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterPatientDto } from 'src/patients/dto/register-patient.dto';
import { MailService } from 'src/mail/mail.service';
import { capitalizeEveryWord } from 'src/helpers/capitalize';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registerPatient(
    profilePhoto: Express.Multer.File,
    patientDto: RegisterPatientDto,
  ) {
    const existing = await this.getPatientByEmail(patientDto.email);

    if (existing) {
      throw new ConflictException(
        `Patient are already existing with this email ${existing.email}`,
      );
    }

    const saltOrRounds = 10;

    const { password, confirmPassword, ...extraData } = patientDto;

    if (password !== confirmPassword) {
      throw new UnauthorizedException(
        'Password and Confirm password not match.',
      );
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const createData = {
      ...extraData,
      password: hashPassword,
    };

    if (profilePhoto) {
      createData['profilePhoto'] = profilePhoto.originalname;
    }

    const patient = this.patientRepository.create(createData);

    const patientDataResult = await this.patientRepository.save(patient);

    const payload = {
      id: patientDataResult.id,
      email: patientDataResult.email,
      role: patientDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.mailService.sendMail({
      to: patientDataResult.email,
      subject: 'Welcome to Patient',
      template: 'welcome/welcome-patient',
      context: {
        patientName: capitalizeEveryWord(
          `${patientDataResult.firstName} ${patientDataResult.lastName}`,
        ),
        patientEmail: patientDataResult.email,
        supportEmail: 'hello@rndtechnosoft.com',
      },
    });

    return {
      token,
      user: {
        id: patientDataResult.id,
        firstName: patientDataResult.firstName,
        lastName: patientDataResult.lastName,
        email: patientDataResult.email,
        contact: patientDataResult.contact,
      },
    };
  }

  async createPatient(
    profilePhoto: Express.Multer.File,
    patientDto: CreatePatientDto,
  ) {
    if (!profilePhoto) {
      throw new BadRequestException('profilePhoto is required');
    }

    const existing = await this.getPatientByEmail(patientDto.email);

    if (existing) {
      throw new ConflictException(
        `Patient are already existing with this email ${existing.email}`,
      );
    }

    const saltOrRounds = 10;

    const { password, ...extraData } = patientDto;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const patient = this.patientRepository.create({
      ...extraData,
      password: hashPassword,
      profilePhoto: profilePhoto.originalname,
    });

    const patientDataResult = await this.patientRepository.save(patient);

    const payload = {
      id: patientDataResult.id,
      email: patientDataResult.email,
      role: patientDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: patientDataResult.id,
        firstName: patientDataResult.firstName,
        lastName: patientDataResult.lastName,
        email: patientDataResult.email,
        contact: patientDataResult.contact,
      },
    };
  }

  async loginPatient(patientDto: LoginDto) {
    const patientDataResult = await this.getPatientByEmail(patientDto.email);

    if (!patientDataResult) {
      throw new NotFoundException('Invalid credentials');
    }

    if (patientDataResult.role !== Role.Patient) {
      throw new ForbiddenException();
    }

    const compare = await bcrypt.compare(
      patientDto.password,
      patientDataResult.password,
    );

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: patientDataResult.id,
      email: patientDataResult.email,
      role: patientDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: patientDataResult.id,
        firstName: patientDataResult.firstName,
        lastName: patientDataResult.lastName,
        email: patientDataResult.email,
        contact: patientDataResult.contact,
      },
    };
  }

  async getPatientById(patientId: number) {
    try {
      return await this.patientRepository.findOneOrFail({
        where: { id: patientId },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }
  }

  async getPatientByEmail(email: string) {
    return await this.patientRepository.findOneBy({ email: email });
  }
}

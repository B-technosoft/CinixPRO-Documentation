import * as bcrypt from 'bcryptjs';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/users/dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly jwtService: JwtService,
  ) {}

  async loginDoctor(doctorDto: LoginDto) {
    const doctorDataResult = await this.getDoctorByEmail(doctorDto.email);

    if (!doctorDataResult) {
      throw new NotFoundException(
        `Doctor with email ${doctorDto.email} not found`,
      );
    }

    const compare = await bcrypt.compare(
      doctorDto.password,
      doctorDataResult.password,
    );

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: doctorDataResult.id,
      email: doctorDataResult.email,
      role: doctorDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: doctorDataResult.id,
        firstName: doctorDataResult.firstName,
        lastName: doctorDataResult.lastName,
        email: doctorDataResult.email,
        contact: doctorDataResult.contact,
      },
    };
  }

  async getDoctorByEmail(email: string) {
    return await this.doctorRepository.findOneBy({ email: email });
  }

  async getDoctorById(doctorId: number) {
    try {
      return await this.doctorRepository.findOneOrFail({
        where: { id: doctorId },
      });
    } catch (error) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
  }

  async getDoctorByIdWithRelationship(doctorId: number) {
    try {
      return await this.doctorRepository.findOneOrFail({
        relations: ['availableTime', 'availableDays'],
        where: { id: doctorId },
      });
    } catch (error) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
  }

  async doctorList() {
    return await this.doctorRepository.find();
  }
}

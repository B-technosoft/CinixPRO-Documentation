import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { LoginDto } from 'src/users/dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptionist } from './entities/receptionist.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/users/enums/role.enums';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { MailService } from 'src/mail/mail.service';
import { capitalizeEveryWord } from 'src/helpers/capitalize';

@Injectable()
export class ReceptionistService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionRepository: Repository<Receptionist>,
    private readonly jwtService: JwtService,
    private readonly doctorsService: DoctorsService,
    private readonly mailService: MailService,
  ) {}

  async registerReceptionist(
    profilePhoto: Express.Multer.File,
    createReceptionistDto: CreateReceptionistDto,
  ) {
    if (!profilePhoto) {
      throw new BadRequestException('profilePhoto is required');
    }

    const existing = await this.findReceptionistByEmail(
      createReceptionistDto.email,
    );

    if (existing) {
      throw new ConflictException(
        `Receptionist are already existing with this email ${existing.email}`,
      );
    }

    const { password, doctorIds, ...extraData } = createReceptionistDto;

    const saltOrRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const doctors = await Promise.all(
      await doctorIds.map(async (doctorId: number) => {
        return await this.doctorsService.getDoctorById(doctorId);
      }),
    );

    const receptionist = await this.receptionRepository.create({
      ...extraData,
      password: hashPassword,
      profilePhoto: profilePhoto.originalname,
      doctors,
      role: Role.Receptionist,
    });

    const receptionistResult =
      await this.receptionRepository.save(receptionist);

    const payload = {
      id: receptionistResult.id,
      email: receptionistResult.email,
      role: receptionistResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.mailService.sendMail({
      to: receptionistResult.email,
      subject: 'Welcome Receptionist',
      template: 'welcome/welcome-receptionist',
      context: {
        receptionistName: capitalizeEveryWord(
          `${receptionistResult.firstName} ${receptionistResult.lastName}`,
        ),
        doctors,
        supportEmail: 'hello@rndtechnosoft.com',
        initialPassword: password,
      },
    });

    return {
      token,
      result: {
        id: receptionistResult.id,
        firstName: receptionistResult.firstName,
        lastName: receptionistResult.lastName,
        email: receptionistResult.email,
        contact: receptionistResult.contact,
      },
    };
  }

  async loginReceptionists(loginbody: LoginDto) {
    const receptionistsDataResult = await this.findReceptionistByEmail(
      loginbody.email,
    );

    if (!receptionistsDataResult) {
      throw new NotFoundException(
        `Receptionist with email ${loginbody.email} not found`,
      );
    }

    const compare = await bcrypt.compare(
      loginbody.password,
      receptionistsDataResult.password,
    );

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: receptionistsDataResult.id,
      email: receptionistsDataResult.email,
      role: receptionistsDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: receptionistsDataResult.id,
        firstName: receptionistsDataResult.firstName,
        lastName: receptionistsDataResult.lastName,
        email: receptionistsDataResult.email,
        contact: receptionistsDataResult.contact,
      },
    };
  }

  async findReceptionistByEmail(email: string) {
    return await this.receptionRepository.findOneBy({ email });
  }

  async findReceptionistById(id: number) {
    try {
      return await this.receptionRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findReceptionistByIdWithRelationship(id: number) {
    try {
      return await this.receptionRepository.findOneOrFail({
        where: { id },
        relations: {
          doctors: true,
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

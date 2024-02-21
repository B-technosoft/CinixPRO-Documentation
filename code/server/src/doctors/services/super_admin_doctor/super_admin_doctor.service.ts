import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from 'src/doctors/dto/create-doctor.dto';
import { AvailableTime } from 'src/doctors/entitys/available_time.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { Role } from 'src/users/enums/role.enums';
import { CreateAppointmentTimeDto } from 'src/doctors/dto/create-avaliable-time.dto';
import { UpdateDoctorSuperAdminDTO } from 'src/doctors/dto/update-doctor-super_admin.dto';
import { AvailableDayService } from 'src/available_day/available_day.service';
import { capitalizeEveryWord } from 'src/helpers/capitalize';
import { MailService } from 'src/mail/mail.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Injectable()
export class SuperAdminDoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(AvailableTime)
    private readonly availableTimeRepository: Repository<AvailableTime>,
    private readonly soctorsService: DoctorsService,
    private readonly availableDayService: AvailableDayService,
    private readonly mailService: MailService,
  ) {}

  async registerDoctor(
    profilePhoto: Express.Multer.File,
    doctorDto: CreateDoctorDto,
  ) {
    if (!profilePhoto) {
      throw new BadRequestException('profilePhoto is required');
    }

    const existing = await this.soctorsService.getDoctorByEmail(
      doctorDto.email,
    );

    if (existing) {
      throw new ConflictException(
        `Doctor are already existing with this email ${existing.email}`,
      );
    }

    const { password, availableTimes, availableDays, ...extraData } = doctorDto;

    const saltOrRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const doctor = await this.doctorRepository.create({
      ...extraData,
      password: hashPassword,
      profilePhoto: profilePhoto.originalname,
      role: Role.Doctor,
    });

    const doctorDataResult = await this.doctorRepository.save(doctor);

    await Promise.all(
      await availableDays.map(
        async (availableDay) =>
          await this.availableDayService.createAvailableDay({
            ...availableDay,
            doctor: doctorDataResult,
          }),
      ),
    );

    const availableTime = await Promise.all(
      availableTimes.map(async (availableTime: CreateAppointmentTimeDto) => {
        const createAvailableTime = await this.availableTimeRepository.create({
          doctor: doctorDataResult,
          timeFrom: availableTime.timeFrom,
          timeTo: availableTime.timeTo,
        });

        return await this.availableTimeRepository.save(createAvailableTime);
      }),
    );

    await this.mailService.sendMail({
      to: doctorDataResult.email,
      subject: 'Welcome to Doctor',
      template: 'welcome/welcome-doctor',
      context: {
        doctorName: capitalizeEveryWord(
          `${doctorDataResult.firstName} ${doctorDataResult.lastName}`,
        ),
        doctorEmail: doctorDataResult.email,
        initialPassword: password,
        supportEmail: 'hello@rndtechnosoft.com',
      },
    });

    return {
      user: {
        id: doctorDataResult.id,
        firstName: doctorDataResult.firstName,
        lastName: doctorDataResult.lastName,
        email: doctorDataResult.email,
        contact: doctorDataResult.contact,
        availableTimes: availableTime,
      },
    };
  }

  async fetchAllDoctotListForSuperAdmin(searchQuery: SearchQueryDto) {
    if (searchQuery.search) {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .addSelect([
          'COUNT(CASE WHEN appointment.isComplete = false THEN appointment.id ELSE null END) AS pending_appointment',
          'COUNT(CASE WHEN appointment.isComplete = true THEN appointment.id ELSE null END) AS complete_appointment',
        ])
        .leftJoin('doctor.appointment', 'appointment')
        .groupBy('doctor.id')
        .where('doctor.firstName Like :search', {
          search: `%${searchQuery.search}%`,
        })
        .orWhere('doctor.lastName Like :search', {
          search: `%${searchQuery.search}%`,
        })
        .getRawMany();
    }

    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .addSelect([
        'COUNT(CASE WHEN appointment.isComplete = false THEN appointment.id ELSE null END) AS pending_appointment',
        'COUNT(CASE WHEN appointment.isComplete = true THEN appointment.id ELSE null END) AS complete_appointment',
      ])
      .leftJoin('doctor.appointment', 'appointment')
      .groupBy('doctor.id')
      .getRawMany();
  }

  async getDoctorByIdForSuperAdmin(doctorId: number) {
    try {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoinAndSelect('doctor.availableDays', 'availableDays')
        .leftJoinAndSelect('doctor.availableTime', 'availableTimes')
        .where('doctor.id = :id', { id: doctorId })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateDoctorForSuperAdmin(
    doctorId: number,
    updateDoctorSuperAdminDTO: UpdateDoctorSuperAdminDTO,
    profilePhoto: Express.Multer.File,
  ) {
    try {
      const doctor = await this.doctorRepository.findOneOrFail({
        where: { id: doctorId },
        relations: {
          availableTime: true,
          availableDays: true,
        },
      });

      const { availableDays, availableTimes, ...extraData } =
        updateDoctorSuperAdminDTO;

      if (profilePhoto) {
        extraData['profilePhoto'] = profilePhoto.originalname;
      }

      const result = await this.doctorRepository
        .createQueryBuilder()
        .update(Doctor)
        .set(extraData)
        .where('id = :doctorId', {
          doctorId: doctor.id,
        })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
      }

      const availableDayRemoveId = doctor.availableDays
        .filter(
          (availableDay) =>
            !availableDays.some(
              (dataAvailableDay) => dataAvailableDay.id === availableDay.id,
            ),
        )
        .map((availableDay) => availableDay.id);

      //? remove Available Day
      if (availableDayRemoveId.length) {
        await this.availableDayService.removesAvailableDay(
          availableDayRemoveId,
        );
      }

      //? create new or update availableDays
      await availableDays.forEach(async (availableDay) => {
        if (availableDay.id) {
          return await this.availableDayService.updateAvailableDay(
            availableDay.id,
            {
              day: availableDay.day,
              doctor: availableDay.doctor,
            },
          );
        }
        const newAvailableDayData = {
          ...availableDay,
          doctor,
        };
        return await this.availableDayService.createAvailableDay(
          newAvailableDayData as any,
        );
      });

      const availableTimesRemoveId = doctor.availableTime
        .filter(
          (availableTime) =>
            !availableTimes.some(
              (dataAvailableTimes) =>
                dataAvailableTimes.id === availableTime.id,
            ),
        )
        .map((availableTime) => availableTime.id);

      if (availableTimesRemoveId.length) {
        await this.availableTimeRepository.delete(availableTimesRemoveId);
      }

      //? create new or update Available Time
      await availableTimes.forEach(async (availableTime) => {
        if (availableTime.id) {
          const data = await this.availableTimeRepository.findOneByOrFail({
            id: availableTime.id,
          });
          Object.assign(data, {
            timeFrom: availableTime.timeFrom,
            timeTo: availableTime.timeTo,
            doctor,
          });
          return await this.availableTimeRepository.save(data);
        }

        const data = await this.availableTimeRepository.create({
          ...availableTime,
          doctor,
        });

        return await this.availableTimeRepository.save(data);
      });

      return { result: 'Doctor Profile Updated successfully' };
    } catch (error) {
      console.log(error);

      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          `email is already ${updateDoctorSuperAdminDTO.email} use`,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteDoctorForSuperAdmin(doctorId: number) {
    const result = await this.doctorRepository
      .createQueryBuilder()
      .delete()
      .from('doctor')
      .where('id = :id', {
        id: doctorId,
      })
      .execute();

    if (result.affected !== 1) throw new BadRequestException();

    return {
      message: 'Doctor deleted successfully',
    };
  }
}

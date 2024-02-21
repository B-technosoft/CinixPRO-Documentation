import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { UpdateDoctorProfileDto } from 'src/profiles/dto/update-doctor-profile.dto';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Repository } from 'typeorm';
import { AvailableDayService } from 'src/available_day/available_day.service';
import { AvailableTime } from 'src/doctors/entitys/available_time.entity';

@Injectable()
export class DoctorProfileService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(AvailableTime)
    private readonly availableTimeRepository: Repository<AvailableTime>,
    private readonly doctorsService: DoctorsService,
    private readonly availableDayService: AvailableDayService,
  ) {}

  async getDoctorProfile(user: PayloadInterface) {
    return await this.doctorsService.getDoctorByIdWithRelationship(user.id);
  }

  async updateDoctorProfile(
    user: PayloadInterface,
    updateDoctorProfileDto: UpdateDoctorProfileDto,
    profilePhoto: Express.Multer.File,
  ) {
    const doctor = await this.doctorsService.getDoctorByIdWithRelationship(
      user.id,
    );

    const { availableDays, availableTimes, ...extraData } =
      updateDoctorProfileDto;

    if (profilePhoto) {
      extraData['profilePhoto'] = profilePhoto.originalname;
    }

    try {
      const result = await this.doctorRepository
        .createQueryBuilder()
        .update(Doctor)
        .set(extraData)
        .where('id = :doctorId', {
          doctorId: user.id,
        })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException(`Doctor with ID ${user.id} not found`);
      }

      const availableDayRemoveId = doctor.availableDays
        .filter(
          (availableDay) =>
            !availableDays.some(
              (dataAvailableDay) => dataAvailableDay.id === availableDay.id,
            ),
        )
        .map((availableDay) => availableDay.id);

      if (availableDayRemoveId.length) {
        await this.availableDayService.removesAvailableDay(
          availableDayRemoveId,
        );
      }

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

      throw new InternalServerErrorException(
        'Something went wrong while updating doctor',
      );
    }
  }
}

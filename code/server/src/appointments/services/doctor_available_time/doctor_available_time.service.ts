import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';

import * as dayjs from 'dayjs';

@Injectable()
export class DoctorAvailableTimeService {
  constructor(private readonly doctorService: DoctorsService) {}

  async getDoctorAvailableTime(
    user: PayloadInterface,
    appointmentDate?: string,
  ) {
    try {
      if (!appointmentDate) {
        throw new BadRequestException(
          'appointmentDate is required is query parameter',
        );
      }

      const appointmentDateName = dayjs(appointmentDate).format('dddd');

      const { availableTime, availableDays } =
        await this.doctorService.getDoctorByIdWithRelationship(user.id);

      if (
        !availableDays.some(
          (availableDay) => availableDay.day === appointmentDateName,
        )
      ) {
        return [];
      }

      return availableTime;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }
}

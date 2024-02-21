import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';

@Injectable()
export class ReceptionistDoctorAvailableTimeService {
  constructor(private readonly doctorService: DoctorsService) {}

  async getPatientDoctorAvailableTime(
    doctorId: number,
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
        await this.doctorService.getDoctorByIdWithRelationship(doctorId);

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

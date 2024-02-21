import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';

@Injectable()
export class DoctorAvailableDayService {
  constructor(private readonly doctorService: DoctorsService) {}

  async getDoctorAvailableDay(user: PayloadInterface) {
    try {
      const doctor = await this.doctorService.getDoctorByIdWithRelationship(
        user.id,
      );

      return doctor.availableDays;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

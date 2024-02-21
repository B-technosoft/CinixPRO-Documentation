import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';

@Injectable()
export class PatientDoctorAvailableDayService {
  constructor(private readonly doctorService: DoctorsService) {}

  async getPatientDoctorAvailableDay(doctorId: number) {
    try {
      const { availableDays } =
        await this.doctorService.getDoctorByIdWithRelationship(doctorId);

      return availableDays;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

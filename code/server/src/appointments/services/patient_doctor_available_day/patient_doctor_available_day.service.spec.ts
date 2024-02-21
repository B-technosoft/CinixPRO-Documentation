import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableDayService } from './patient_doctor_available_day.service';

describe('PatientDoctorAvailableDayService', () => {
  let service: PatientDoctorAvailableDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientDoctorAvailableDayService],
    }).compile();

    service = module.get<PatientDoctorAvailableDayService>(
      PatientDoctorAvailableDayService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

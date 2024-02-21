import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableTimeService } from './patient_doctor_available_time.service';

describe('PatientDoctorAvailableTimeService', () => {
  let service: PatientDoctorAvailableTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientDoctorAvailableTimeService],
    }).compile();

    service = module.get<PatientDoctorAvailableTimeService>(
      PatientDoctorAvailableTimeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableSlotService } from './patient_doctor_available_slot.service';

describe('PatientDoctorAvailableSlotService', () => {
  let service: PatientDoctorAvailableSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientDoctorAvailableSlotService],
    }).compile();

    service = module.get<PatientDoctorAvailableSlotService>(
      PatientDoctorAvailableSlotService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

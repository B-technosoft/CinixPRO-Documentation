import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorAvailableSlotService } from './receptionist_doctor_available_slot.service';

describe('ReceptionistDoctorAvailableSlotService', () => {
  let service: ReceptionistDoctorAvailableSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistDoctorAvailableSlotService],
    }).compile();

    service = module.get<ReceptionistDoctorAvailableSlotService>(
      ReceptionistDoctorAvailableSlotService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableSlotsService } from './doctor_available_slots.service';

describe('DoctorAvailableSlotsService', () => {
  let service: DoctorAvailableSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAvailableSlotsService],
    }).compile();

    service = module.get<DoctorAvailableSlotsService>(
      DoctorAvailableSlotsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

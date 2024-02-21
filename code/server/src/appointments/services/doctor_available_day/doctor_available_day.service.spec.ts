import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableDayService } from './doctor_available_day.service';

describe('DoctorAvailableDayService', () => {
  let service: DoctorAvailableDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAvailableDayService],
    }).compile();

    service = module.get<DoctorAvailableDayService>(DoctorAvailableDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

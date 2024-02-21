import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableTimeService } from './doctor_available_time.service';

describe('DoctorAvailableTimeService', () => {
  let service: DoctorAvailableTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAvailableTimeService],
    }).compile();

    service = module.get<DoctorAvailableTimeService>(
      DoctorAvailableTimeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

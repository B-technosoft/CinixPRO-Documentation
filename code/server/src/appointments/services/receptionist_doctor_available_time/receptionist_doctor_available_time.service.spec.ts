import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorAvailableTimeService } from './receptionist_doctor_available_time.service';

describe('ReceptionistDoctorAvailableTimeService', () => {
  let service: ReceptionistDoctorAvailableTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistDoctorAvailableTimeService],
    }).compile();

    service = module.get<ReceptionistDoctorAvailableTimeService>(
      ReceptionistDoctorAvailableTimeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorService } from './receptionist_doctor.service';

describe('ReceptionistDoctorService', () => {
  let service: ReceptionistDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistDoctorService],
    }).compile();

    service = module.get<ReceptionistDoctorService>(ReceptionistDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

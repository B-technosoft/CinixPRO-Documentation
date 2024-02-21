import { Test, TestingModule } from '@nestjs/testing';
import { CountsDoctorService } from './counts_doctor.service';

describe('CountsDoctorService', () => {
  let service: CountsDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountsDoctorService],
    }).compile();

    service = module.get<CountsDoctorService>(CountsDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

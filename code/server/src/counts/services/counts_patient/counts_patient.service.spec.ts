import { Test, TestingModule } from '@nestjs/testing';
import { CountsPatientService } from './counts_patient.service';

describe('CountsPatientService', () => {
  let service: CountsPatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountsPatientService],
    }).compile();

    service = module.get<CountsPatientService>(CountsPatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

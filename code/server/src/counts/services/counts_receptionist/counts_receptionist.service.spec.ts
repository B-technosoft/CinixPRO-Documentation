import { Test, TestingModule } from '@nestjs/testing';
import { CountsReceptionistService } from './counts_receptionist.service';

describe('CountsReceptionistService', () => {
  let service: CountsReceptionistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountsReceptionistService],
    }).compile();

    service = module.get<CountsReceptionistService>(CountsReceptionistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

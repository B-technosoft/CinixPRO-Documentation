import { Test, TestingModule } from '@nestjs/testing';
import { AvailableDayService } from './available_day.service';

describe('AvailableDayService', () => {
  let service: AvailableDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableDayService],
    }).compile();

    service = module.get<AvailableDayService>(AvailableDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AvailableDayController } from './available_day.controller';
import { AvailableDayService } from './available_day.service';

describe('AvailableDayController', () => {
  let controller: AvailableDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableDayController],
      providers: [AvailableDayService],
    }).compile();

    controller = module.get<AvailableDayController>(AvailableDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

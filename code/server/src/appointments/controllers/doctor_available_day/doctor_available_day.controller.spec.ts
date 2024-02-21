import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableDayController } from './doctor_available_day.controller';

describe('DoctorAvailableDayController', () => {
  let controller: DoctorAvailableDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailableDayController],
    }).compile();

    controller = module.get<DoctorAvailableDayController>(
      DoctorAvailableDayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

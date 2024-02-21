import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableTimeController } from './doctor_available_time.controller';

describe('DoctorAvailableTimeController', () => {
  let controller: DoctorAvailableTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailableTimeController],
    }).compile();

    controller = module.get<DoctorAvailableTimeController>(
      DoctorAvailableTimeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

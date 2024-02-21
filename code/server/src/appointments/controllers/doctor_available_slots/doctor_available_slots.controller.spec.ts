import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailableSlotsController } from './doctor_available_slots.controller';

describe('DoctorAvailableSlotsController', () => {
  let controller: DoctorAvailableSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailableSlotsController],
    }).compile();

    controller = module.get<DoctorAvailableSlotsController>(
      DoctorAvailableSlotsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

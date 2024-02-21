import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorAvailableSlotController } from './receptionist_doctor_available_slot.controller';

describe('ReceptionistDoctorAvailableSlotController', () => {
  let controller: ReceptionistDoctorAvailableSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistDoctorAvailableSlotController],
    }).compile();

    controller = module.get<ReceptionistDoctorAvailableSlotController>(
      ReceptionistDoctorAvailableSlotController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

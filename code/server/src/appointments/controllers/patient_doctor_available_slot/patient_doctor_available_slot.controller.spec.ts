import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableSlotController } from './patient_doctor_available_slot.controller';

describe('PatientDoctorAvailableSlotController', () => {
  let controller: PatientDoctorAvailableSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientDoctorAvailableSlotController],
    }).compile();

    controller = module.get<PatientDoctorAvailableSlotController>(
      PatientDoctorAvailableSlotController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

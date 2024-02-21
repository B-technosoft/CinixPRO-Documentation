import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableTimeController } from './patient_doctor_available_time.controller';

describe('PatientDoctorAvailableTimeController', () => {
  let controller: PatientDoctorAvailableTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientDoctorAvailableTimeController],
    }).compile();

    controller = module.get<PatientDoctorAvailableTimeController>(
      PatientDoctorAvailableTimeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

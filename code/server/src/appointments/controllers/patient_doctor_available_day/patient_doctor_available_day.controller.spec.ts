import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorAvailableDayController } from './patient_doctor_available_day.controller';

describe('PatientDoctorAvailableDayController', () => {
  let controller: PatientDoctorAvailableDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientDoctorAvailableDayController],
    }).compile();

    controller = module.get<PatientDoctorAvailableDayController>(
      PatientDoctorAvailableDayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

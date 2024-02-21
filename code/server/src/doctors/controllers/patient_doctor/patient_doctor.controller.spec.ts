import { Test, TestingModule } from '@nestjs/testing';
import { PatientDoctorController } from './patient_doctor.controller';

describe('PatientDoctorController', () => {
  let controller: PatientDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientDoctorController],
    }).compile();

    controller = module.get<PatientDoctorController>(PatientDoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

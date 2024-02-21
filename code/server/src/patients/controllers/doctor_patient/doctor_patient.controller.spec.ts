import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPatientController } from './doctor_patient.controller';

describe('DoctorPatientController', () => {
  let controller: DoctorPatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorPatientController],
    }).compile();

    controller = module.get<DoctorPatientController>(DoctorPatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionDoctorController } from './prescription_doctor.controller';

describe('PrescriptionDoctorController', () => {
  let controller: PrescriptionDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionDoctorController],
    }).compile();

    controller = module.get<PrescriptionDoctorController>(
      PrescriptionDoctorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

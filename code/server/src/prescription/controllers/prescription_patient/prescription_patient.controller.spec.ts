import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionPatientController } from './prescription_patient.controller';

describe('PrescriptionPatientController', () => {
  let controller: PrescriptionPatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionPatientController],
    }).compile();

    controller = module.get<PrescriptionPatientController>(
      PrescriptionPatientController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

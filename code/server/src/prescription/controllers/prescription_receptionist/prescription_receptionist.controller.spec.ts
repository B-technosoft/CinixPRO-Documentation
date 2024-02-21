import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionReceptionistController } from './prescription_receptionist.controller';

describe('PrescriptionReceptionistController', () => {
  let controller: PrescriptionReceptionistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionReceptionistController],
    }).compile();

    controller = module.get<PrescriptionReceptionistController>(
      PrescriptionReceptionistController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

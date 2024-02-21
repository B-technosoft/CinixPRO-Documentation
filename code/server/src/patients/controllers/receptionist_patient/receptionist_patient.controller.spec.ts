import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistPatientController } from './receptionist_patient.controller';

describe('ReceptionistPatientController', () => {
  let controller: ReceptionistPatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistPatientController],
    }).compile();

    controller = module.get<ReceptionistPatientController>(
      ReceptionistPatientController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

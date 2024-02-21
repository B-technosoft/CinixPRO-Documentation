import { Test, TestingModule } from '@nestjs/testing';
import { CountsPatientController } from './counts_patient.controller';

describe('CountsPatientController', () => {
  let controller: CountsPatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountsPatientController],
    }).compile();

    controller = module.get<CountsPatientController>(CountsPatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DoctorReceptionistController } from './doctor_receptionist.controller';

describe('DoctorReceptionistController', () => {
  let controller: DoctorReceptionistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorReceptionistController],
    }).compile();

    controller = module.get<DoctorReceptionistController>(
      DoctorReceptionistController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

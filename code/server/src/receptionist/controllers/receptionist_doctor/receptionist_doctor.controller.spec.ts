import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorController } from './receptionist_doctor.controller';

describe('ReceptionistDoctorController', () => {
  let controller: ReceptionistDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistDoctorController],
    }).compile();

    controller = module.get<ReceptionistDoctorController>(
      ReceptionistDoctorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

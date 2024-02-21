import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistDoctorAvailableTimeController } from './receptionist_doctor_available_time.controller';

describe('ReceptionistDoctorAvailableTimeController', () => {
  let controller: ReceptionistDoctorAvailableTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistDoctorAvailableTimeController],
    }).compile();

    controller = module.get<ReceptionistDoctorAvailableTimeController>(
      ReceptionistDoctorAvailableTimeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAppointmentController } from './doctor_appointment.controller';

describe('DoctorAppointmentController', () => {
  let controller: DoctorAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAppointmentController],
    }).compile();

    controller = module.get<DoctorAppointmentController>(
      DoctorAppointmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

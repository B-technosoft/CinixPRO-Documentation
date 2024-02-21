import { Test, TestingModule } from '@nestjs/testing';
import { PatientAppointmentController } from './patient_appointment.controller';

describe('PatientAppointmentController', () => {
  let controller: PatientAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientAppointmentController],
    }).compile();

    controller = module.get<PatientAppointmentController>(
      PatientAppointmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

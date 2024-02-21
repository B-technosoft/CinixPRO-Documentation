import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistAppointmentController } from './receptionist_appointment.controller';

describe('ReceptionistAppointmentController', () => {
  let controller: ReceptionistAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistAppointmentController],
    }).compile();

    controller = module.get<ReceptionistAppointmentController>(
      ReceptionistAppointmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminAppointmentsController } from './super_admin_appointments.controller';

describe('SuperAdminAppointmentsController', () => {
  let controller: SuperAdminAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminAppointmentsController],
    }).compile();

    controller = module.get<SuperAdminAppointmentsController>(
      SuperAdminAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminDoctorController } from './super_admin_doctor.controller';

describe('SuperAdminDoctorController', () => {
  let controller: SuperAdminDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminDoctorController],
    }).compile();

    controller = module.get<SuperAdminDoctorController>(
      SuperAdminDoctorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminPatientsController } from './super_admin_patients.controller';

describe('SuperAdminPatientsController', () => {
  let controller: SuperAdminPatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminPatientsController],
    }).compile();

    controller = module.get<SuperAdminPatientsController>(
      SuperAdminPatientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

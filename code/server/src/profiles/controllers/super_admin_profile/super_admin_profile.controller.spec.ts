import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminProfileController } from './super_admin_profile.controller';

describe('SuperAdminProfileController', () => {
  let controller: SuperAdminProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminProfileController],
    }).compile();

    controller = module.get<SuperAdminProfileController>(
      SuperAdminProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminsController } from './super_admins.controller';

describe('SuperAdminsController', () => {
  let controller: SuperAdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminsController],
    }).compile();

    controller = module.get<SuperAdminsController>(SuperAdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistSuperAdminController } from './receptionist_super_admin.controller';

describe('ReceptionistSuperAdminController', () => {
  let controller: ReceptionistSuperAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistSuperAdminController],
    }).compile();

    controller = module.get<ReceptionistSuperAdminController>(
      ReceptionistSuperAdminController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

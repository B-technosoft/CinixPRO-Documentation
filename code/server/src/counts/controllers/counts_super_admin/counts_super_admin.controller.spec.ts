import { Test, TestingModule } from '@nestjs/testing';
import { CountsSuperAdminController } from './counts_super_admin.controller';

describe('CountsSuperAdminController', () => {
  let controller: CountsSuperAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountsSuperAdminController],
    }).compile();

    controller = module.get<CountsSuperAdminController>(
      CountsSuperAdminController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

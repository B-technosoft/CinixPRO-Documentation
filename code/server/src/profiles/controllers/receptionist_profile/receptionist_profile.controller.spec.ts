import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistProfileController } from './receptionist_profile.controller';

describe('ReceptionistProfileController', () => {
  let controller: ReceptionistProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistProfileController],
    }).compile();

    controller = module.get<ReceptionistProfileController>(
      ReceptionistProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

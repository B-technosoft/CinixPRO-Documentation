import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminProfileService } from './super_admin_profile.service';

describe('SuperAdminProfileService', () => {
  let service: SuperAdminProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminProfileService],
    }).compile();

    service = module.get<SuperAdminProfileService>(SuperAdminProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

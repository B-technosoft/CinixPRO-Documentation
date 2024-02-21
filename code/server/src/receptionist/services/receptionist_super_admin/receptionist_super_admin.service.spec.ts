import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistSuperAdminService } from './receptionist_super_admin.service';

describe('ReceptionistSuperAdminService', () => {
  let service: ReceptionistSuperAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistSuperAdminService],
    }).compile();

    service = module.get<ReceptionistSuperAdminService>(
      ReceptionistSuperAdminService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

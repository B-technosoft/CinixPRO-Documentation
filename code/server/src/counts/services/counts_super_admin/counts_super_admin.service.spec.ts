import { Test, TestingModule } from '@nestjs/testing';
import { CountsSuperAdminService } from './counts_super_admin.service';

describe('CountsSuperAdminService', () => {
  let service: CountsSuperAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountsSuperAdminService],
    }).compile();

    service = module.get<CountsSuperAdminService>(CountsSuperAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

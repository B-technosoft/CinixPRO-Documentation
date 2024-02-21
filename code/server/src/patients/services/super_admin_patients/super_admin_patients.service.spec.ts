import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminPatientsService } from './super_admin_patients.service';

describe('SuperAdminPatientsService', () => {
  let service: SuperAdminPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminPatientsService],
    }).compile();

    service = module.get<SuperAdminPatientsService>(SuperAdminPatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

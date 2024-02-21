import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminDoctorService } from './super_admin_doctor.service';

describe('SuperAdminDoctorService', () => {
  let service: SuperAdminDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminDoctorService],
    }).compile();

    service = module.get<SuperAdminDoctorService>(SuperAdminDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

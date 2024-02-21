import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminAppointmentsService } from './super_admin_appointments.service';

describe('SuperAdminAppointmentsService', () => {
  let service: SuperAdminAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminAppointmentsService],
    }).compile();

    service = module.get<SuperAdminAppointmentsService>(
      SuperAdminAppointmentsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

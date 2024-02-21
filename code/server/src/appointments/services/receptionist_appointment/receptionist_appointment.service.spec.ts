import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistAppointmentService } from './receptionist_appointment.service';

describe('ReceptionistAppointmentService', () => {
  let service: ReceptionistAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistAppointmentService],
    }).compile();

    service = module.get<ReceptionistAppointmentService>(
      ReceptionistAppointmentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

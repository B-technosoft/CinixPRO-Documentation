import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAppointmentService } from './doctor_appointment.service';

describe('DoctorAppointmentService', () => {
  let service: DoctorAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAppointmentService],
    }).compile();

    service = module.get<DoctorAppointmentService>(DoctorAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

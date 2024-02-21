import { Test, TestingModule } from '@nestjs/testing';
import { PatientAppointmentService } from './patient_appointment.service';

describe('PatientAppointmentService', () => {
  let service: PatientAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientAppointmentService],
    }).compile();

    service = module.get<PatientAppointmentService>(PatientAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

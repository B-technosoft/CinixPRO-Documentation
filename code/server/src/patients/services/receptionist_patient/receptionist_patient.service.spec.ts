import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistPatientService } from './receptionist_patient.service';

describe('ReceptionistPatientService', () => {
  let service: ReceptionistPatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistPatientService],
    }).compile();

    service = module.get<ReceptionistPatientService>(
      ReceptionistPatientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

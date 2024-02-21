import { Test, TestingModule } from '@nestjs/testing';
import { PatientInvoiceService } from './patient_invoice.service';

describe('PatientInvoiceService', () => {
  let service: PatientInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientInvoiceService],
    }).compile();

    service = module.get<PatientInvoiceService>(PatientInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

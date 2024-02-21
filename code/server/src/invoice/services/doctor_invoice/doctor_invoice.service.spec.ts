import { Test, TestingModule } from '@nestjs/testing';
import { DoctorInvoiceService } from './doctor_invoice.service';

describe('DoctorInvoiceService', () => {
  let service: DoctorInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorInvoiceService],
    }).compile();

    service = module.get<DoctorInvoiceService>(DoctorInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

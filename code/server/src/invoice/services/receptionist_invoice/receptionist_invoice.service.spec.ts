import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistInvoiceService } from './receptionist_invoice.service';

describe('ReceptionistInvoiceService', () => {
  let service: ReceptionistInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistInvoiceService],
    }).compile();

    service = module.get<ReceptionistInvoiceService>(
      ReceptionistInvoiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

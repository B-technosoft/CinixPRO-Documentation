import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionPdfService } from './prescription_pdf.service';

describe('PrescriptionPdfService', () => {
  let service: PrescriptionPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionPdfService],
    }).compile();

    service = module.get<PrescriptionPdfService>(PrescriptionPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

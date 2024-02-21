import { Test, TestingModule } from '@nestjs/testing';
import { PatientInvoiceController } from './patient_invoice.controller';

describe('PatientInvoiceController', () => {
  let controller: PatientInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientInvoiceController],
    }).compile();

    controller = module.get<PatientInvoiceController>(PatientInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DoctorInvoiceController } from './doctor_invoice.controller';

describe('DoctorInvoiceController', () => {
  let controller: DoctorInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorInvoiceController],
    }).compile();

    controller = module.get<DoctorInvoiceController>(DoctorInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

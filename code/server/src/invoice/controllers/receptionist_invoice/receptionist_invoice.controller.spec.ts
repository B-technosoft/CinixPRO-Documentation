import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistInvoiceController } from './receptionist_invoice.controller';

describe('ReceptionistInvoiceController', () => {
  let controller: ReceptionistInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistInvoiceController],
    }).compile();

    controller = module.get<ReceptionistInvoiceController>(
      ReceptionistInvoiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

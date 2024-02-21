import { Test, TestingModule } from '@nestjs/testing';
import { TestReportController } from './test_report.controller';
import { TestReportService } from './test_report.service';

describe('TestReportController', () => {
  let controller: TestReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestReportController],
      providers: [TestReportService],
    }).compile();

    controller = module.get<TestReportController>(TestReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

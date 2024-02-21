import { Test, TestingModule } from '@nestjs/testing';
import { TestReportService } from './test_report.service';

describe('TestReportService', () => {
  let service: TestReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestReportService],
    }).compile();

    service = module.get<TestReportService>(TestReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Controller } from '@nestjs/common';
import { TestReportService } from './test_report.service';

@Controller('test-report')
export class TestReportController {
  constructor(private readonly testReportService: TestReportService) {}
}

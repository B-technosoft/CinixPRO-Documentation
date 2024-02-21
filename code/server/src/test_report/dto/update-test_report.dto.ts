import { PartialType } from '@nestjs/mapped-types';
import { CreateTestReportDto } from './create-test_report.dto';

export class UpdateTestReportDto extends PartialType(CreateTestReportDto) {}

import { Module } from '@nestjs/common';
import { TestReportService } from './test_report.service';
import { TestReportController } from './test_report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestReport } from './entities/test_report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestReport])],
  controllers: [TestReportController],
  providers: [TestReportService],
  exports: [TestReportService],
})
export class TestReportModule {}

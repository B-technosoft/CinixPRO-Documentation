import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestReportDto } from './dto/create-test_report.dto';
import { UpdateTestReportDto } from './dto/update-test_report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestReport } from './entities/test_report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestReportService {
  constructor(
    @InjectRepository(TestReport)
    private readonly testReportRepository: Repository<TestReport>,
  ) {}

  async createTestReport(createTestReportDto: CreateTestReportDto) {
    const testReport = this.testReportRepository.create(createTestReportDto);

    return await this.testReportRepository.save(testReport);
  }

  async findAllTestReports() {
    return await this.testReportRepository.find();
  }

  async findOneTestReport(id: number) {
    return this.findTestReportById(id);
  }

  async updateTestReport(id: number, updateTestReportDto: UpdateTestReportDto) {
    const result = await this.findTestReportById(id);

    Object.assign(result, updateTestReportDto);

    return {
      message: 'Test Report Update successfully',
      result: await this.testReportRepository.save(result),
    };
  }

  async removeTestReport(id: number) {
    const result = await this.findTestReportById(id);

    const remove = await this.testReportRepository.remove(result);

    return remove;
  }

  async findTestReportById(id: number) {
    try {
      return await this.testReportRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

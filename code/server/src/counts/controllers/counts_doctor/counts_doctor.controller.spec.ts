import { Test, TestingModule } from '@nestjs/testing';
import { CountsDoctorController } from './counts_doctor.controller';

describe('CountsDoctorController', () => {
  let controller: CountsDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountsDoctorController],
    }).compile();

    controller = module.get<CountsDoctorController>(CountsDoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

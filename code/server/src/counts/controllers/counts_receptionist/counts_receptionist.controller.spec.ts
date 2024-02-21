import { Test, TestingModule } from '@nestjs/testing';
import { CountsReceptionistController } from './counts_receptionist.controller';

describe('CountsReceptionistController', () => {
  let controller: CountsReceptionistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountsReceptionistController],
    }).compile();

    controller = module.get<CountsReceptionistController>(
      CountsReceptionistController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

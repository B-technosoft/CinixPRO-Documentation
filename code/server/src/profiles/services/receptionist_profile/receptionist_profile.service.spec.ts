import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistProfileService } from './receptionist_profile.service';

describe('ReceptionistProfileService', () => {
  let service: ReceptionistProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionistProfileService],
    }).compile();

    service = module.get<ReceptionistProfileService>(
      ReceptionistProfileService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

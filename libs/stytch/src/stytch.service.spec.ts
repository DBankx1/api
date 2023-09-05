import { Test, TestingModule } from '@nestjs/testing';
import { StytchService } from './stytch.service';

describe('StytchService', () => {
  let service: StytchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StytchService],
    }).compile();

    service = module.get<StytchService>(StytchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

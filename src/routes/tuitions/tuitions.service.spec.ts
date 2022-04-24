import { Test, TestingModule } from '@nestjs/testing';
import { TuitionsService } from './tuitions.service';

describe('TuitionsService', () => {
  let service: TuitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuitionsService],
    }).compile();

    service = module.get<TuitionsService>(TuitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

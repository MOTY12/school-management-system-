import { Test, TestingModule } from '@nestjs/testing';
import { TuitionsController } from './tuitions.controller';
import { TuitionsService } from './tuitions.service';

describe('TuitionsController', () => {
  let controller: TuitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuitionsController],
      providers: [TuitionsService],
    }).compile();

    controller = module.get<TuitionsController>(TuitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LangueController } from './langue.controller';
import { LangueService } from './langue.service';

describe('LangueController', () => {
  let controller: LangueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangueController],
      providers: [LangueService],
    }).compile();

    controller = module.get<LangueController>(LangueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

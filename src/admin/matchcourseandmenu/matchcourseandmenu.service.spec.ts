import { Test, TestingModule } from '@nestjs/testing';
import { MatchcourseandmenuService } from './matchcourseandmenu.service';

describe('MatchcourseandmenuService', () => {
  let service: MatchcourseandmenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchcourseandmenuService],
    }).compile();

    service = module.get<MatchcourseandmenuService>(MatchcourseandmenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

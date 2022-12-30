import { Test, TestingModule } from '@nestjs/testing';
import { MatchCourseAndMenuService } from './matchcourseandmenu.service';

describe('MatchcourseandmenuService', () => {
  let service: MatchCourseAndMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchCourseAndMenuService],
    }).compile();

    service = module.get<MatchCourseAndMenuService>(MatchCourseAndMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

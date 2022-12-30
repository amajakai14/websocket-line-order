import { Test, TestingModule } from '@nestjs/testing';
import { MatchCourseAndMenuController } from './matchcourseandmenu.controller';

describe('MatchcourseandmenuController', () => {
  let controller: MatchCourseAndMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchCourseAndMenuController],
    }).compile();

    controller = module.get<MatchCourseAndMenuController>(
      MatchCourseAndMenuController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

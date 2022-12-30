import { Module } from '@nestjs/common';
import { MatchCourseAndMenuController } from './matchcourseandmenu.controller';
import { MatchcourseandmenuService } from './matchcourseandmenu.service';

@Module({
  controllers: [MatchCourseAndMenuController],
  providers: [MatchcourseandmenuService],
})
export class MatchcourseandmenuModule {}

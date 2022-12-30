import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseOnMenuRepository } from '../../repositories/course.on.menu.repository';
import { MatchCourseAndMenuController } from './matchcourseandmenu.controller';
import { MatchCourseAndMenuService } from './matchcourseandmenu.service';

@Module({
  controllers: [MatchCourseAndMenuController],
  providers: [MatchCourseAndMenuService, CourseOnMenuRepository, PrismaService],
})
export class MatchCourseAndMenuModule {}

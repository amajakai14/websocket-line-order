import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/auth.user.decorator';
import { UserWithoutPassword } from '../../auth/jwt/jwt.payload';
import { MatchCourseAndMenuRequest } from './match.course.and.menu.request';
import { MatchCourseAndMenuService } from './matchcourseandmenu.service';

@Controller('matchcourseandmenu')
export class MatchCourseAndMenuController {
  constructor(private readonly service: MatchCourseAndMenuService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCourseAndMenu(@AuthUser() user: UserWithoutPassword) {
    return await this.service.getCoursesAndMenus(user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async matchCourseAndMenu(
    @AuthUser() user: UserWithoutPassword,
    @Body() req: MatchCourseAndMenuRequest,
  ) {
    return await this.service.matchCourseAndMenu(
      user.userId,
      req.menu_id,
      req.course_id,
    );
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteCourseAndMenu(
    @AuthUser() user: UserWithoutPassword,
    @Body() req: MatchCourseAndMenuRequest,
  ) {
    return await this.service.deleteCourseAndMenu(
      user.userId,
      req.menu_id,
      req.course_id,
    );
  }
}

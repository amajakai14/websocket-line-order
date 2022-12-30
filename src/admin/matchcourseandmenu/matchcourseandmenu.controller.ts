import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/auth.user.decorator';
import { UserWithoutPassword } from '../../auth/jwt/jwt.payload';
import { MatchcourseandmenuService as MatchCourseAndMenuService } from './matchcourseandmenu.service';

@Controller('matchcourseandmenu')
export class MatchCourseAndMenuController {
  constructor(private readonly service: MatchCourseAndMenuService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCourseAndMenu(@AuthUser() user: UserWithoutPassword) {
    return await this.service.getCoursesAndMenus(user.userId);
  }
}

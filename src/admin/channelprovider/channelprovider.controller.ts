import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/auth.user.decorator';
import { UserWithoutPassword } from '../../auth/jwt/jwt.payload';
import { CreateChannelRequest } from './channelprovider.add.request';
import { ChannelProviderService } from './channelprovider.service';

@Controller('channelprovider')
export class ChannelProviderController {
  constructor(private readonly service: ChannelProviderService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createChannelProvider(
    @AuthUser() user: UserWithoutPassword,
    @Body() body: CreateChannelRequest,
  ) {
    const result = await this.service.createChannelProvider(user.userId, body);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}

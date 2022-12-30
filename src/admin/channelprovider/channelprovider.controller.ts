import { Body, Controller, HttpException, Post, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { CreateChannelRequest } from './channelprovider.add.request';
import { ChannelProviderService } from './channelprovider.service';

@Controller('channelprovider')
export class ChannelProviderController {
  constructor(private readonly service: ChannelProviderService) {}
  @Post()
  async createChannelProvider(@Req() req, @Body() body: CreateChannelRequest) {
    const decoded: CustomerId = req.app.locals.decoded;
    const result = await this.service.createChannelProvider(
      decoded.customerId,
      body,
    );
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}

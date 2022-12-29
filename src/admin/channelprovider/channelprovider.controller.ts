import { Body, Controller, HttpException, Post, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { CreateChannelRequest } from './channelprovider.add.request';
import { ChannelproviderService } from './channelprovider.service';

@Controller('channelprovider')
export class ChannelproviderController {
  constructor(private readonly service: ChannelproviderService) {}
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

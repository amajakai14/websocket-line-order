import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './socket/socket.gateway';

@Controller('gethello')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private socket: EventsGateway,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const server = this.socket.getServer();
    server.emit('message', 'hello from getHello');
    return this.appService.getHello();
  }
}

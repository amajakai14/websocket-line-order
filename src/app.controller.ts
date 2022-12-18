import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './socket/socket.gateway';
import { Server } from 'socket.io';

@Controller('gethello')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private socket: EventsGateway,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const rooms: string[] = ['channel1', 'channel2'];
    const wss: Server = this.socket.getServer();
    wss.to(rooms).emit('message', 'some menu has been sold out');
    return this.appService.getHello();
  }
}

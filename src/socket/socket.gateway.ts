import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface SocketRequest {
  message: string;
  room: string;
}

@WebSocketGateway({ namespace: '/channel', cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  getServer(): any {
    return this.server;
  }

  @SubscribeMessage('message')
  handleEvent(client: Socket, socketRequest: SocketRequest): void {
    this.joinRoom(client, socketRequest.room);
    this.server.to(socketRequest.room).emit('message', socketRequest.message);
  }

  @SubscribeMessage('addCart')
  handleCart(@MessageBody() item: string): void {
    this.server.emit('addCart', item);
  }

  @SubscribeMessage('joinAdmin')
  handleAdminJoin(client: Socket, admin: string): void {
    console.log('admin: ', admin);
    client.join(['channel1', 'channel2']);
  }

  handleAnnounce(rooms: string[]): void {
    this.server.to(rooms).emit('message', 'some menu has been sold out');
  }

  joinRoom(client: Socket, room: string): void {
    if (client.rooms.size > 1) {
      client.rooms.forEach((value) => {
        if (value != room) client.leave(value);
      });
    }
    if (client.rooms.has(room)) return;
    client.join(room);
    client.emit('joinedRoom', room);
  }
}

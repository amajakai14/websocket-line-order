/* eslint-disable prettier/prettier */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

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
    console.log('client', client);
    console.log(
      `Object Received with room ${socketRequest.room} and messsage: ${socketRequest.message}`,
    );
    this.joinRoom(client, socketRequest.room);
    this.server.to(socketRequest.room).emit('message', socketRequest.message);
    console.log(`message from server ${socketRequest.message}`);
  }

  @SubscribeMessage('addCart')
  handleCart(@MessageBody() item: string): void {
    this.server.emit('addCart', item);
    console.log(`message from server ${item}`);
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

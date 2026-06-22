import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server!: Server;

  handleConnection(client: Socket): void {
    console.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyTicketCreated(ticket: unknown): void {
    this.server.emit('ticket.created', ticket);
  }

  notifyTicketStatusChanged(payload: unknown): void {
    this.server.emit('ticket.statusChanged', payload);
  }
}

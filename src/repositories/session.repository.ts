import { Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { Token } from '../model/token';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}
  async createSessionOf(customer_id: number): Promise<Token> {
    const session = new SessionEntity();
    session.customer_id = customer_id;
    this.sessionRepository.save(session);
    return new Token(session.session_id);
  }
}

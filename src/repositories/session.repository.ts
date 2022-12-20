import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SessionEntity } from '../entities/session.entity';
import { Token } from '../model/token';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}
  async createSessionOf(customer_id: number): Promise<Token> {
    const session = new SessionEntity();
    while (true) {
      session.session_id = this.generateUUID();
      const exists = await this.exists(session.session_id);
      if (exists == null) break;
    }
    session.customer_id = customer_id;
    this.sessionRepository.insert(session);
    return new Token(session.session_id);
  }

  async exists(session_id: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOneBy({ session_id });
  }

  generateUUID(): string {
    return uuidv4();
  }
}

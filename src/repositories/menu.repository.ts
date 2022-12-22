import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly sessionRepository: Repository<MenuEntity>,
  ) {}

  async createMenuOf(menuEntity: MenuEntity): Promise<void> {
    this.sessionRepository.insert(menuEntity);
  }
}

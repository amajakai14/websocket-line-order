import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Menu } from '../model/menu';
import { CustomerId } from './../model/customer-id';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly sessionRepository: Repository<MenuEntity>,
  ) {}

  async createMenuOf(menuEntity: MenuEntity): Promise<void> {
    this.sessionRepository.insert(menuEntity);
  }

  async getListOf(customerId: CustomerId): Promise<Menu[]> {
    return;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../../src/order/order.controller';
import { OrderService } from './../../../src/order/order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController, OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

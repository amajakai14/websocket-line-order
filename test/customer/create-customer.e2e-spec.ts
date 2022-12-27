import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateCustomerRequest } from '../../src/customer/customer.create.request';
import { CustomExceptionFilter } from '../../src/utils/filter/custom-exception.filter';

describe('createCustomer (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('fail: cause of login id is too short', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'Iam',
      password: 'password',
      mailAddress: 'ironman@example.com',
    };
    await request(app.getHttpServer()).post('/customer').send(req).expect(400);
  });

  it('fail: is not an email', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'Iamironman',
      password: 'password',
      mailAddress: 'ironmaxample.com',
    };
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('mailAddress');
  });
});

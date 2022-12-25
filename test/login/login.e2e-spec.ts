import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { dataSource } from '../../src/config/typeorm.datasource';
import { CreateCustomerRequest } from '../../src/customer/customer.create.request';
import { CustomerEntity } from '../../src/entities/customer.entity';
import { LoginRequest } from '../../src/login/login.request';
import { CustomExceptionFilter } from '../../src/utils/filter/custom-exception.filter';

describe('createCustomer (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CustomerEntity>;

  const mockUser: CreateCustomerRequest = {
    loginId: 'sample_user2',
    password: 'password',
    mailAddress: 'sample_user2@example.com',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await dataSource.initialize();
    repository = await dataSource.getRepository(CustomerEntity);
    await repository.clear();

    await app.init();

    await request(app.getHttpServer())
      .post('/customer')
      .send(mockUser)
      .expect(201);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('login success', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('fail: cause of login id is too short', async () => {
    const req: LoginRequest = {
      loginId: 'Iam',
      password: 'password',
    };
    await request(app.getHttpServer()).post('/login').send(req).expect(400);
  });

  it('fail: wrong login id', async () => {
    const req: LoginRequest = {
      loginId: 'wrong_user',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('ID or Password are incorrect');
  });

  it('fail: wrong password', async () => {
    const req: LoginRequest = {
      loginId: 'wrong_user',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('ID or Password are incorrect');
  });
});

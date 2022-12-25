import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { dataSource } from '../../../src/config/typeorm.datasource';
import { CustomerEntity } from '../../../src/entities/customer.entity';
import { MenuEntity } from '../../../src/entities/menu.entity';
import { LoginRequest } from '../../../src/login/login.request';
import { CustomExceptionFilter } from '../../../src/utils/filter/custom-exception.filter';

describe('menus (e2e)', () => {
  let app: INestApplication;
  let customerRepository: Repository<CustomerEntity>;
  let menuRepository: Repository<MenuEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await dataSource.initialize();
    customerRepository = await dataSource.getRepository(CustomerEntity);
    menuRepository = await dataSource.getRepository(MenuEntity);
    await customerRepository.clear();
    await menuRepository.clear();
  });

  beforeEach(async () => {
    await customerRepository.clear();
    await menuRepository.clear();

    const testPath = path.dirname(path.dirname(__dirname));
    const sqlTestPath = path.join(testPath, '/testsql/customer2-initial.sql');
    const testSql = fs.readFileSync(sqlTestPath, 'utf8');
    await dataSource.query(testSql);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  async function login(): Promise<string> {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    return response.body.token;
  }
  it('success', async () => {
    const token = await login();
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    console.log(response.body);
  });
});

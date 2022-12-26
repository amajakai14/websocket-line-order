import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { LoginRequest } from '../../../src/login/login.request';
import { Menu } from '../../../src/model/menu';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CustomExceptionFilter } from '../../../src/utils/filter/custom-exception.filter';

describe('menus (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prismaService.tbl_menu.deleteMany({});
    await prismaService.tbl_customer.deleteMany({ where: {} });
    const testPath = path.dirname(path.dirname(__dirname));
    const sqlTestPath = path.join(testPath, '/testsql/customer2-initial.sql');
    const sqlMenuPath = path.join(testPath, '/testsql/menu-initial.sql');
    const testSql = fs.readFileSync(sqlTestPath, 'utf8');
    const menuSql = fs.readFileSync(sqlMenuPath, 'utf8');

    await prismaService.$executeRawUnsafe(testSql);
    await prismaService.$executeRawUnsafe(menuSql);
  });

  afterAll(async () => {
    await app.close();
  });

  async function login(req: LoginRequest): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    return response.body.token;
  }

  it('success', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };

    const token = await login(req);
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    const menuList: Menu[] = response.body;
    expect(response.statusCode).toBe(200);
    expect(menuList.length).toBe(3);
  });

  it('have not register any menu yet', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user3',
      password: 'password',
    };

    const token = await login(req);
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    const menuList: Menu[] = response.body;
    expect(response.statusCode).toBe(200);
    expect(menuList.length).toBe(0);
  });
});

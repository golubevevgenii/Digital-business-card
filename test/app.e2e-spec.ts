import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';


describe('CV API (e2e)', () => {
  let app: INestApplication;
  
  let prisma: PrismaService;

  const testUserId = 'test_12345';

  beforeAll(async () => {
    process.env.USER_ID = testUserId;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.profileInfo.deleteMany({ where: { id: testUserId } });
  });

  afterAll(async () => {
    await prisma.profileInfo.deleteMany({ where: { id: testUserId } });
    await app.close();
  });

  const seedProfile = async () => {
    return await prisma.profileInfo.create({
      id: testUserId,
      first_name: 'Тест',
      last_name: 'Тестовый',
      birth_year: 2000,
      phone: '+79991112233',
      email: 'test@example.com',
    });
  };
  
  describe('Site', () => {
    it('/ (GET) serves the frontend', async () => {
      return request(app.getHttpServer())//
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(({ text }) => {
          expect(text).toContain('<title>Визитка GraphQL (Динамические поля)</title>');
        });
    });
  })

  describe('ProfileInfo', () => {
    it('возвращает профиль пользователя', async () => {
      await seedProfile();

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ profileInfo { first_name last_name } }' })
        .expect(200);

      expect(res.body.data.profileInfo).toEqual({
        first_name: 'Тест',
        last_name: 'Тестовый',
      });
    });
  });

  describe('Education', () => {
    it('возвращает образование пользователя, проверяет что бд возвращает только нужные поля', async () => {
      await seedProfile();
      await prisma.education.create({
        id: 't_edu_1',
        user_id: testUserId,
        university: 'НГУ',
        start_year: 2015,
        end_year: 2019,
      });

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ profileEducation { university start_year } }' })
        .expect(200);

      const educationList = res.body.data.profileEducation;

      expect(educationList[0]).toEqual({
        university: 'НГУ',
        start_year: 2015,
      });

      expect(educationList[0].end_year).toBeUndefined();

      expect(Object.keys(educationList[0])).toHaveLength(2);
    });
  });

  describe('Experience', () => {
    it('возвращает опыт пользователя', async () => {
      await seedProfile();
      await prisma.experience.create({
        id: 't_exp_1',
        user_id: testUserId,
        company_name: 'Tech Solutions',
        start_year: 2018,
        end_year: 2021,
        achievements: [
          'Перевел монолит на микросервисную архитектуру',
          'Оптимизировал SQL-запросы, снизив нагрузку на БД на 30%',
        ],
      });

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ profileExperience { company_name } }' })
        .expect(200);


      expect(res.body.data.profileExperience[0]).toEqual({ 
        company_name: 'Tech Solutions' 
      });
    });
  });

  describe('Skills', () => {
    it('возвращает навыки пользователя', async () => {
      await seedProfile();

      await prisma.skill.createMany({
        data: [
        { id: 't_skill_1', user_id: testUserId, skill: 'TypeScript' },
        { id: 't_skill_2', user_id: testUserId, skill: 'GraphQL' },
        ],
      });

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ profileSkills { skill } }' })
        .expect(200);

      expect(res.body.data.profileSkills).toEqual(
        [
          {skill: 'TypeScript'},
          {skill: 'GraphQL'},
        ] 
      )
    });
  });
});
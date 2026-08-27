import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.prisma.profileInfo.upsert({
      where: { id: 'usr_12345' },
      update: {},
      create: {
        id: 'usr_12345',
        first_name: 'Иван',
        last_name: 'Иванов',
        birth_year: 1995,
        phone: '+79991112233',
        email: 'john@example.com',
        telegram_url: 'https://t.me/john_doe',
        location: 'Москва, Россия',
      },
    });

    await this.prisma.education.createMany({
      skipDuplicates: true,
      data: [
        {
          id: 'edu_1',
          user_id: 'usr_12345',
          university: 'МГТУ им. Н.Э. Баумана',
          start_year: 2013,
          end_year: 2017,
          degree: 'Бакалавр',
          field_of_study: 'Информатика и вычислительная техника',
        },
        {
          id: 'edu_2',
          user_id: 'usr_12345',
          university: 'МГТУ им. Н.Э. Баумана',
          start_year: 2017,
          end_year: 2019,
          degree: 'Магистр',
          field_of_study: 'Информатика и вычислительная техника',
        },
      ],
    });

    await this.prisma.experience.createMany({
      skipDuplicates: true,
      data: [
        {
          id: 'exp_1',
          user_id: 'usr_12345',
          company_name: 'Tech Solutions',
          start_year: 2018,
          end_year: 2021,
          achievements: [
            'Перевел монолит на микросервисную архитектуру',
            'Оптимизировал SQL-запросы, снизив нагрузку на БД на 30%',
          ],
        },
        {
          id: 'exp_2',
          user_id: 'usr_12345',
          company_name: 'FinTech Group',
          start_year: 2021,
          end_year: null,
          achievements: [
            'Разработал высоконагруженный API с поддержкой WebSocket',
            'Внедрил CI/CD процессы и Docker-контейнеризацию',
          ],
        },
      ],
    });

    await this.prisma.skill.createMany({
      skipDuplicates: true,
      data: [
        { id: '1', skill: 'SQL', user_id: 'usr_12345', },
        { id: '2', skill: 'API', user_id: 'usr_12345', },
        { id: '3', skill: 'CSS', user_id: 'usr_12345', },
        { id: '4', skill: 'Docker', user_id: 'usr_12345', },
        { id: '5', skill: 'Git', user_id: 'usr_12345', },
      ],
    });
  }

  private createSelectMask(fields: string[]): Record<string, boolean> {
    return fields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }

  async getInfo(selectFields: string[]) {

    const result = await this.prisma.profileInfo.findUnique({
      where: { id: process.env.USER_ID },
      select: this.createSelectMask(selectFields),
    });
    console.log('result из бд', result);
    return result
  }

  async getEducation(selectFields?: string[]) {
    const result = await this.prisma.education.findMany({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }

  async getExperience(selectFields?: string[]) {
    const result = await this.prisma.experience.findMany({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }

  async getSkills(selectFields?: string[]) {
    const result = await this.prisma.skill.findMany({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }
}

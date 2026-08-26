import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  EducationEntity,
  ExperienceEntity,
  ProfileInfoEntity,
  SkillEntity,
} from './entities/database/profile.database.entity';
import { FindOptionsSelect } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileInfoEntity)
    private readonly profileRepository?: Repository<ProfileInfoEntity>,
    @InjectRepository(EducationEntity)
    private readonly educationRepository?: Repository<EducationEntity>,
    @InjectRepository(ExperienceEntity)
    private readonly experienceRepository?: Repository<ExperienceEntity>,
    @InjectRepository(SkillEntity)
    private readonly skillRepository?: Repository<SkillEntity>,
  ) {}

  async onModuleInit() {
    if (!this.profileRepository) return;

    await this.profileRepository.save(
      {
        id: 'usr_12345',
        first_name: 'Иван',
        last_name: 'Иванов',
        birth_year: 1995,
        phone: '+79991112233',
        email: 'john@example.com',
        telegram_url: 'https://t.me/john_doe',
        location: 'Москва, Россия',
      }
    );

    await this.educationRepository?.save(
      [
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
      ]
    );

    await this.experienceRepository?.save(
      [
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
      ]
    );

    await this.skillRepository?.save(
      [
        { id: '1', skill: 'SQL', user_id: 'usr_12345', },
        { id: '2', skill: 'API', user_id: 'usr_12345', },
        { id: '3', skill: 'CSS', user_id: 'usr_12345', },
        { id: '4', skill: 'Docker', user_id: 'usr_12345', },
        { id: '5', skill: 'Git', user_id: 'usr_12345', },
      ]
    );
  }

  private createSelectMask<T>(fields: string[]): FindOptionsSelect<T> {
    return fields.reduce((acc, field) => {
      acc[field as keyof T] = true as any;
      return acc;
    }, {} as FindOptionsSelect<T>);
  }

  async getInfo(selectFields: string[]) {

    const result = await this.profileRepository?.findOne({
      where: { id: process.env.USER_ID },
      select: this.createSelectMask<ProfileInfoEntity>(selectFields),
    });
    console.log('result из бд', result);
    return result
  }

  async getEducation(selectFields?: string[]) {
    const result = await this.educationRepository?.find({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask<EducationEntity>(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }

  async getExperience(selectFields?: string[]) {
    const result = await this.experienceRepository?.find({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask<ExperienceEntity>(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }

  async getSkills(selectFields?: string[]) {
    const result = await this.skillRepository?.find({
      where: { user_id: process.env.USER_ID },
      ...(selectFields && { select: this.createSelectMask<SkillEntity>(selectFields) }),
    });
    console.log('result из бд', result);
    return result
  }
}

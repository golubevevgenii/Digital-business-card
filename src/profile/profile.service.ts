import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  EducationEntity,
  ExperienceEntity,
  ProfileInfoEntity,
  SkillEntity,
} from './entities/database/profile.database.entity';

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
        { id: '1', name: 'SQL', user_id: 'usr_12345', },
        { id: '2', name: 'API', user_id: 'usr_12345', },
        { id: '3', name: 'CSS', user_id: 'usr_12345', },
        { id: '4', name: 'Docker', user_id: 'usr_12345', },
        { id: '5', name: 'Git', user_id: 'usr_12345', },
      ]
    );
  }

  async getInfo() {
    return this.profileRepository?.findOneBy({ id: process.env.USER_ID });
  }

  async getEducation() {
    return this.educationRepository?.findBy({ user_id: process.env.USER_ID });
  }

  async getExperience() {
    return this.experienceRepository?.findBy({ user_id: process.env.USER_ID });
  }

  async getSkills() {
    return this.skillRepository?.findBy({ user_id: process.env.USER_ID });
  }
}

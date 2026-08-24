import { Injectable } from '@nestjs/common';

export const mockUserProfile = {
  info: {  
    id: 'usr_12345',
    first_name: 'Иван',
    last_name: 'Иванов',
    birth_year: 1995,
    phone: '+79991112233',
    email: 'john@example.com',
    telegram_url: 'https://t.me/john_doe',
    location: 'Москва, Россия'
  },
  
  education: [
    {
      id: 'edu_1',
      university: 'МГТУ им. Н.Э. Баумана',
      start_year: 2013,
      end_year: 2017,
      degree: 'Бакалавр',
      field_of_study: 'Информатика и вычислительная техника',
    },
    {
      id: 'edu_2',
      university: 'МГТУ им. Н.Э. Баумана',
      start_year: 2017,
      end_year: 2019,
      degree: 'Магистр',
      field_of_study: 'Информатика и вычислительная техника',
    },
  ],

  experience: [
    {
      id: 'exp_1',
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
      company_name: 'FinTech Group',
      start_year: 2021,
      end_year: null, // по настоящее время
      achievements: [
        'Разработал высоконагруженный API с поддержкой WebSocket',
        'Внедрил CI/CD процессы и Docker-контейнеризацию',
      ],
    },
  ],

  skills: [
    { id: 1, name: 'SQL' },
    { id: 2, name: 'API' },
    { id: 3, name: 'CSS' },
    { id: 4, name: 'Docker' },
    { id: 5, name: 'Git' },
  ],
};

@Injectable()
export class ProfileService {
  async getInfo() {
    return mockUserProfile.info;
  }

  async getEducation() {
    return mockUserProfile.education;
  }

  async getExperience() {
    return mockUserProfile.experience
  }

  async getSkills() {
    return mockUserProfile.skills
  }
}

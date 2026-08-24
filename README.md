# Digital Business Card

Backend цифровой визитной карточки на NestJS и GraphQL. Приложение также раздает HTML-страницу из `public/`.

## Требования

- Node.js 20 или новее
- npm
- Docker и Docker Compose для запуска в контейнере

## Установка и запуск

```bash
npm install
npm run start:dev
```

После запуска по умолчанию доступны:

- `GET http://localhost:3000/` — frontend из `public/index.html`;
- `POST http://localhost:3000/graphql` — GraphQL API;
- `http://localhost:3000/graphql` — интерфейс GraphQL Playground.

## GraphQL API

GraphQL использует путь `/graphql` в нижнем регистре. Доступны четыре query-поля:

| Query | Возвращаемый тип | Назначение |
| --- | --- | --- |
| `profileInfo` | `ProfileObjectType` | Основные данные профиля |
| `profileEducation` | `[EducationObjectType]` | Образование |
| `profileExperience` | `[ExperienceObjectType]` | Опыт работы |
| `profileSkills` | `[SkillObjectType]` | Навыки |

Пример одного запроса для загрузки всех секций:

```graphql
query {
  profileInfo {
    id
    first_name
    last_name
    birth_year
    phone
    email
    telegram_url
    location
  }
  profileEducation {
    id
    university
    start_year
    end_year
    degree
    field_of_study
  }
  profileExperience {
    id
    company_name
    start_year
    end_year
    achievements
  }
  profileSkills {
    id
    name
  }
}
```

Поля `birth_year`, `phone`, `telegram_url`, `location`, `start_year`, `end_year` и `degree` могут быть `null`.

Пример HTTP-запроса:

```bash
curl http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  --data '{"query":"{ profileInfo { id first_name last_name email } }"}'
```

## Данные

Профиль сейчас хранится в памяти в `src/profile/profile.service.ts`. База данных, авторизация и mutations не подключены. Изменения данных требуют изменения `mockUserProfile` и перезапуска приложения.

## Docker

Сборка образа и запуск контейнера:

```bash
docker compose up --build
```

Запуск в фоне и полезные команды:

```bash
docker compose up --build -d
docker compose logs -f app
docker compose ps
docker compose down
```

Compose публикует порт `3000` хоста на порт `3000` приложения. Production-образ собирается в несколько этапов на базе Node.js 20 Alpine и запускается командой `node dist/main.js`.

Во время Docker-сборки на builder-стадии сначала выполняются e2e-тесты, затем собирается приложение и удаляются dev-зависимости. Если e2e-тесты завершаются с ошибкой, образ не будет собран.

## Проверка проекта

```bash
npm run build       # Сборка TypeScript
npm test            # Unit-тесты
npm run test:cov    # Unit-тесты с покрытием
npm run test:e2e    # E2E-тесты локального приложения
npm run lint        # ESLint с автоматическим исправлением
npm run format      # Форматирование исходников
```

E2E-тесты находятся в `test/app.e2e-spec.ts` и поднимают приложение напрямую в тестовом процессе; вручную запускать отдельный сервер для `npm run test:e2e` не требуется. В Docker они также запускаются автоматически во время сборки образа.


## Структура проекта

```text
src/
  app.module.ts                               # Основной модуль, static files и GraphQL
  app.controller.ts                           # GET /
  main.ts                                     # Точка входа приложения
  profile/
    profile.resolver.ts                       # GraphQL query-поля профиля
    profile.service.ts                        # Данные профиля и методы чтения
    entities/profile.entity/profile.entity.ts # GraphQL object types
test/app.e2e-spec.ts                          # E2E-проверки frontend и GraphQL
public/index.html                             # Простая клиентская страница
Dockerfile                                    # Multi-stage production-образ
docker-compose.yml                            # Запуск приложения в Docker Compose
```

GraphQL-схема создается NestJS из декораторов в entity и resolver во время запуска. Ее не нужно редактировать вручную.

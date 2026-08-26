# Digital Business Card

Backend цифровой визитной карточки на NestJS с использованием GraphQL.
Приложение также раздает минимальный фронтенд в виде HTML-страницы из `public/`. 
В Playground по /graphql можно проверить GraphQL запросы к бэкенду
Приложение разворачивается в Docker'e с помощью Docker compose
Изолированные тесты на Jest

Технологический стек: Nest.JS, GraphQL, TS, Docker Compouse, PostgreSQL, TypeORM, Jest

## Данные

Данные хранятся в PostgreSQL и получаютcя бэкендом через TypeORM.
Запрос в базу данных выполняется через GraphQL: сервер выбирает только те поля, которые запрошены клиентом, и формирует SQL-выборку только по нужным колонкам.

## Требования

- Node.js 20+
- Docker и Docker Compose

## Команды

### Развертывание
#### Сборка проекта
```bash
docker compose build --no-cache
```
#### Запуск проекта
```bash
docker compose up -d
```

### Тестирование (если развертывания не было — развернет в отдельном контейнере)
#### Запуск тестов
```bash
docker compose run --rm e2e_tests
```

### Разработка
#### Пересборка кода
```bash
docker compose up -d --build
```
#### установка зависимостей (убирает ошибки импортов в редакторе)
```bash
npm i
```

## Доступные эндпоинты

После запуска по адресу `http://localhost:3000/` доступны:
- `/` — frontend из `public/index.html`
- `/graphql` — GraphQL API и Playground

## GraphQL API

Доступные query-поля:
- `profileInfo` — Основные данные профиля
- `profileEducation` — Образование
- `profileExperience` — Опыт работы
- `profileSkills` — Навыки

<details>
<summary> 🔴<ins>Полные запросы ко всем таблицам</ins>🔴 </summary>

```graphql
  query {
    profileInfo {
      first_name
      last_name
      birth_year
      phone
      email
      telegram_url
      location
    }
  }
```

```graphql
  query {
    profileEducation {
      id
      university
      start_year
      end_year
      degree
      field_of_study
    }
  }
```

```graphql
  query {
    profileExperience {
      id
      company_name
      start_year
      end_year
      achievements
    }
  }
```

```graphql
  query {
    profileSkills {
      skill
    }
  }
```

</details>

### Пример запроса

```graphql
query {
  profileInfo {
    id
    first_name
    last_name
    email
  }
}
```


Пример через cURL:

```bash
curl http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  --data '{"query":"{ profileInfo { id first_name last_name email } }"}'
```

## Структура проекта

```text
src/
  app.module.ts                              # Основной модуль приложения
  app.controller.ts                          # Контроллер для отдачи frontend по /
  main.ts                                    # Точка входа приложения
  profile/
    profile.module.ts                        # Модуль профиля
    profile.resolver.ts                      # GraphQL-resolver
    profile.service.ts                       # Логика получения данных профиля
    entities/
      database/
        profile.database.entity.ts          # TypeORM-сущности для PostgreSQL
      profile.entity/
        profile.entity.ts                   # GraphQL-объекты
test/
  app.e2e-spec.ts                           # E2E-тесты
public/
  index.html                                # Минимальный frontend
Dockerfile                                  # Multi-stage сборка контейнера
docker-compose.yml                          # Конфигурация Docker Compose
```

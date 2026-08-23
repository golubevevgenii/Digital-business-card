# Digital Business Card

Backend цифровой визитной карточки на NestJS и GraphQL.

## Требования

- Node.js 20 или новее
- npm
- Docker и Docker Compose для запуска в контейнере

## Установка зависимостей

```bash
npm install
```

## Локальный запуск

Запуск в режиме разработки с автоматической перезагрузкой:

```bash
npm run start:dev
```

После запуска приложение доступно по адресу:

- GraphQL API и GraphQL Playground: http://localhost:3000/graphql

Порт можно изменить через переменную окружения:

```bash
# macOS/Linux
PORT=4000 npm run start:dev

# Windows PowerShell
$env:PORT=4000; npm run start:dev
```

## Запуск в Docker

Сборка образа и запуск контейнера:

```bash
docker compose up --build
```

Для запуска в фоне:

```bash
docker compose up --build -d
```

Полезные команды:

```bash
# Посмотреть логи
docker compose logs -f app

# Проверить запущенные сервисы
docker compose ps

# Остановить и удалить контейнеры
docker compose down
```

Контейнер публикует порт `3000` хоста на порт `3000` приложения. После запуска GraphQL Playground доступен по адресу http://localhost:3000/graphql.

## GraphQL API

Текущая схема содержит запрос `profile`:

```graphql
query {
	profile {
		id
		username
		email
		bio
	}
}
```

Пример ответа:

```json
{
	"data": {
		"profile": {
			"id": "usr_12345",
			"username": "john_doe",
			"email": "john@example.com",
			"bio": "Full-stack разработчик"
		}
	}
}
```

## Проверка проекта

```bash
# Сборка TypeScript
npm run build

# Unit-тесты
npm test

# Unit-тесты с покрытием
npm run test:cov

# E2E-тесты
npm run test:e2e

# Проверка и автоматическое исправление ESLint
npm run lint

# Форматирование исходников
npm run format
```

## Production-запуск без Docker

```bash
npm run build
npm run start:prod
```

По умолчанию приложение использует порт `3000`.

## Структура проекта

```text
src/
	app.module.ts             # Основной модуль и конфигурация GraphQL
	main.ts                   # Точка входа приложения
	profile/                  # Модуль, resolver и service профиля
	schema.gql                # Автоматически генерируемая GraphQL-схема
test/                        # E2E-тесты
Dockerfile                  # Multi-stage production-образ
docker-compose.yml          # Запуск приложения в Docker Compose
```

Файл `src/schema.gql` генерируется NestJS автоматически при запуске и сборке приложения. Изменения схемы следует вносить в entities, resolver и service, а не редактировать этот файл вручную.

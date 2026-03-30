## InLive Frontend

Frontend приложение на **Next.js (App Router)** для проекта InLive.

### Стек

- **Next.js / React / TypeScript**
- **TanStack Query** (React Query)
- **Axios**
- **Jest** (юнит/компонентные тесты)
- **Docker / docker-compose** (опционально)

### Быстрый старт

#### 1) Установка зависимостей

```bash
npm ci
```

#### 2) Запуск в dev-режиме

```bash
npm run dev
```

Открыть в браузере: `http://localhost:3000`

### Скрипты

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # run production build
npm run lint       # lint
npm test           # tests
```

### Переменные окружения

Проект использует `.env*` файлы.  
Не коммить секреты: `.env` уже в `.gitignore`.

Обычно требуется:

- **`API_URL`**: базовый URL backend API (если используется в runtime/сборке)

Если нужен шаблон — сделай `/.env.example` и добавь туда только ключи без значений.

### Docker (опционально)

В репозитории есть `Dockerfile` и `docker-compose.yml`.

```bash
docker compose up --build
```

### Структура проекта (кратко)

Папки в `src/`:

- **`app/`**: роутинг (Next.js App Router), layout/page, providers
- **`shared/`**: общие утилиты, UI-kit, хуки, api-клиент
- **`entities/`**: доменные сущности (типы, запросы, модели)
- **`features/`**: фичи/сценарии (композиция сущностей и shared)
- **`widgets/`**: крупные UI-блоки/компоновка страниц

### CI/CD

Если CI/CD нужен — добавляй workflows обратно в `.github/workflows/` отдельным PR.

# Автоматическое версионирование и логирование изменений

Этот проект использует автоматическое версионирование с помощью `standard-version` и `husky`.

## Как это работает

### Автоматическое версионирование при мердже

При мердже в ветку `master` или `main` автоматически:
1. Увеличивается версия в `package.json` (согласно Semantic Versioning)
2. Генерируется/обновляется `CHANGELOG.md` с описанием изменений
3. Создается git tag с новой версией
4. Создается коммит с изменениями

### Conventional Commits

Для правильной работы системы используйте формат Conventional Commits:

```
<type>(<scope>): <subject>
```

**Типы коммитов:**
- `feat`: новая функциональность (увеличивает MINOR версию)
- `fix`: исправление бага (увеличивает PATCH версию)
- `docs`: изменения в документации
- `style`: форматирование кода (без изменения логики)
- `refactor`: рефакторинг кода
- `perf`: улучшение производительности
- `test`: добавление/изменение тестов
- `chore`: вспомогательные задачи (обновление зависимостей и т.д.)

**Примеры:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve navigation bug on mobile"
git commit -m "docs: update README with installation steps"
git commit -m "refactor(auth): simplify authentication logic"
```

### Breaking Changes

Для MAJOR версии добавьте `BREAKING CHANGE:` в тело коммита:

```bash
git commit -m "feat: redesign API structure

BREAKING CHANGE: API endpoints have been restructured"
```

## Доступные команды

### Автоматическое определение версии
```bash
yarn release
```
Автоматически определяет тип версии на основе коммитов.

### Ручное указание версии

```bash
# Patch версия (0.1.0 -> 0.1.1)
yarn release:patch

# Minor версия (0.1.0 -> 0.2.0)
yarn release:minor

# Major версия (0.1.0 -> 1.0.0)
yarn release:major
```

### Первый релиз
```bash
yarn release:first
```
Создает первый релиз без изменения версии (только CHANGELOG и tag).

### Dry-run (тест без изменений)
```bash
yarn release --dry-run
```

## Semantic Versioning

Формат: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes - несовместимые изменения API
- **MINOR** (0.1.0): Новая функциональность (обратно совместимая)
- **PATCH** (0.0.1): Исправления багов

## Workflow

1. Создайте feature ветку:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Делайте коммиты в формате Conventional Commits:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

3. Сделайте мердж в master:
   ```bash
   git checkout master
   git merge feature/my-feature
   ```

4. **Автоматически** сработает hook `post-merge`, который:
   - Обновит версию в `package.json`
   - Сгенерирует/обновит `CHANGELOG.md`
   - Создаст git tag
   - Создаст коммит с изменениями

5. Запушьте изменения с тегами:
   ```bash
   git push --follow-tags origin master
   ```

## Файлы конфигурации

- `.versionrc.json` - конфигурация standard-version
- `.husky/post-merge` - git hook для автоматического версионирования
- `CHANGELOG.md` - автоматически генерируемый файл с историей изменений

## Примечания

- Hook срабатывает только при мердже в `master` или `main`
- Все коммиты должны следовать формату Conventional Commits
- CHANGELOG автоматически группирует изменения по типам
- Версия в package.json обновляется согласно Semantic Versioning

# Система тем

## Как это работает

Система тем использует CSS Custom Properties (CSS переменные) для динамического переключения цветов.

### Структура

1. **Базовая палитра** (`:root`) - содержит все цветовые константы в RGB формате
2. **Семантические переменные** - переменные с понятными именами, которые используются в компонентах
3. **Темы** - селекторы `[data-theme="название"]`, которые переопределяют семантические переменные

## Использование

### В компонентах React

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

function App() {
  return (
    <div>
      <ThemeSwitcher />
      {/* остальной контент */}
    </div>
  );
}
```

### В SCSS/CSS

Всегда используйте семантические переменные:

```scss
.myComponent {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-blue);
}
```

**Не используйте** напрямую базовые переменные:
```scss
// ❌ Плохо - цвет не изменится при смене темы
.myComponent {
  background: rgb(var(--white));
}

// ✅ Хорошо - цвет изменится автоматически
.myComponent {
  background: var(--color-bg-surface);
}
```

## Доступные темы

1. **Default** - оригинальная тема (синие тона)
2. **Dark** - темная тема (черный фон)
3. **Light** - светлая тема (белый фон)
4. **Blue** - синяя тема

## Добавление новой темы

1. Откройте `src/styles/variables.scss`
2. Добавьте новый блок:

```scss
/* 🎨 Моя новая тема */
[data-theme="my-theme"] {
  --color-bg-primary: rgb(var(--navy));
  --color-bg-secondary: rgb(var(--steel));
  --color-bg-surface: rgb(var(--white));
  --color-bg-aside: rgb(var(--blue-gray));

  --color-text-primary: rgb(var(--light-gray));
  --color-text-secondary: rgb(var(--gray));
  --color-text-mark: rgb(var(--black));

  --background-chip-primary: rgba(var(--blue), 0.1);
  --background-chip-secondary: rgba(var(--blue), 0.2);
}
```

3. Добавьте кнопку в `ThemeSwitcher.tsx`:

```tsx
type Theme = 'default' | 'dark' | 'light' | 'blue' | 'my-theme';

// В JSX:
<button
  className={`${styles.themeButton} ${theme === 'my-theme' ? styles.active : ''}`}
  onClick={() => handleThemeChange('my-theme')}
  title="My Theme"
>
  🎨 My Theme
</button>
```

## Семантические переменные

### Фоны
- `--color-bg-primary` - основной фон приложения
- `--color-bg-secondary` - вторичный фон (секции, карточки)
- `--color-bg-surface` - поверхность (модальные окна, попапы)
- `--color-bg-aside` - боковая панель

### Текст
- `--color-text-primary` - основной текст
- `--color-text-secondary` - вторичный текст
- `--color-text-mark` - выделенный текст (маркировка)

### Акценты
- `--color-blue` - синий акцент
- `--color-yellow` - желтый акцент

### Chips и теги
- `--background-chip-primary` - основной фон для chips
- `--background-chip-secondary` - вторичный фон для chips (hover)

## Программное переключение темы

```tsx
// Применить тему
document.documentElement.setAttribute('data-theme', 'dark');

// Вернуться к default теме
document.documentElement.removeAttribute('data-theme');

// Сохранить в localStorage
localStorage.setItem('theme', 'dark');

// Загрузить из localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
```

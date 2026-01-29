# Theme System

## How It Works

The theme system uses CSS Custom Properties (CSS variables) for dynamic color switching.

### Structure

1. **Base Palette** (`:root`) - contains all color constants in RGB format
2. **Semantic Variables** - variables with meaningful names used in components
3. **Themes** - selectors `[data-theme="name"]` that override semantic variables

## Usage

### In React Components

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

function App() {
  return (
    <div>
      <ThemeSwitcher />
      {/* rest of content */}
    </div>
  );
}
```

### In SCSS/CSS

Always use semantic variables:

```scss
.myComponent {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-blue);
}
```

**Do not use** base variables directly:
```scss
// ❌ Bad - color won't change when theme switches
.myComponent {
  background: rgb(var(--white));
}

// ✅ Good - color will change automatically
.myComponent {
  background: var(--color-bg-surface);
}
```

## Available Themes

1. **Default** - original theme (blue tones)
2. **Dark** - dark theme (black background)
3. **Light** - light theme (white background)
4. **Blue** - blue theme

## Adding a New Theme

1. Open `src/styles/variables.scss`
2. Add a new block:

```scss
/* 🎨 My New Theme */
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

3. Add a button in `ThemeSwitcher.tsx`:

```tsx
type Theme = 'default' | 'dark' | 'light' | 'blue' | 'my-theme';

// In JSX:
<button
  className={`${styles.themeButton} ${theme === 'my-theme' ? styles.active : ''}`}
  onClick={() => handleThemeChange('my-theme')}
  title="My Theme"
>
  🎨 My Theme
</button>
```

## Semantic Variables

### Backgrounds
- `--color-bg-primary` - main application background
- `--color-bg-secondary` - secondary background (sections, cards)
- `--color-bg-surface` - surface (modals, popups)
- `--color-bg-aside` - sidebar

### Text
- `--color-text-primary` - primary text
- `--color-text-secondary` - secondary text
- `--color-text-mark` - highlighted text (marking)

### Accents
- `--color-blue` - blue accent
- `--color-yellow` - yellow accent

### Chips and Tags
- `--background-chip-primary` - primary background for chips
- `--background-chip-secondary` - secondary background for chips (hover)

## Programmatic Theme Switching

```tsx
// Apply theme
document.documentElement.setAttribute('data-theme', 'dark');

// Return to default theme
document.documentElement.removeAttribute('data-theme');

// Save to localStorage
localStorage.setItem('theme', 'dark');

// Load from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
```

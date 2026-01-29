# Automatic Versioning and Changelog

This project uses automatic versioning with `standard-version` and `husky`.

## How It Works

### Automatic Versioning on Merge

When merging into `master` or `main` branch, the following happens automatically:
1. Version in `package.json` is incremented (according to Semantic Versioning)
2. `CHANGELOG.md` is generated/updated with change descriptions
3. A git tag with the new version is created
4. A commit with the changes is created

### Conventional Commits

For the system to work properly, use the Conventional Commits format:

```
<type>(<scope>): <subject>
```

**Commit Types:**
- `feat`: new functionality (increments MINOR version)
- `fix`: bug fix (increments PATCH version)
- `docs`: documentation changes
- `style`: code formatting (no logic changes)
- `refactor`: code refactoring
- `perf`: performance improvements
- `test`: adding/modifying tests
- `chore`: auxiliary tasks (dependency updates, etc.)

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve navigation bug on mobile"
git commit -m "docs: update README with installation steps"
git commit -m "refactor(auth): simplify authentication logic"
```

### Breaking Changes

For MAJOR version, add `BREAKING CHANGE:` to the commit body:

```bash
git commit -m "feat: redesign API structure

BREAKING CHANGE: API endpoints have been restructured"
```

## Available Commands

### Automatic Version Detection
```bash
yarn release
```
Automatically determines the version type based on commits.

### Manual Version Specification

```bash
# Patch version (0.1.0 -> 0.1.1)
yarn release:patch

# Minor version (0.1.0 -> 0.2.0)
yarn release:minor

# Major version (0.1.0 -> 1.0.0)
yarn release:major
```

### First Release
```bash
yarn release:first
```
Creates the first release without changing the version (only CHANGELOG and tag).

### Dry-run (test without changes)
```bash
yarn release --dry-run
```

## Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes - incompatible API changes
- **MINOR** (0.1.0): New functionality (backward compatible)
- **PATCH** (0.0.1): Bug fixes

## Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make commits in Conventional Commits format:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

3. Merge into master:
   ```bash
   git checkout master
   git merge feature/my-feature
   ```

4. The `post-merge` hook will **automatically**:
   - Update the version in `package.json`
   - Generate/update `CHANGELOG.md`
   - Create a git tag
   - Create a commit with the changes

5. Push changes with tags:
   ```bash
   git push --follow-tags origin master
   ```

## Configuration Files

- `.versionrc.json` - standard-version configuration
- `.husky/post-merge` - git hook for automatic versioning
- `CHANGELOG.md` - automatically generated changelog file

## Notes

- The hook only triggers on merge into `master` or `main`
- All commits must follow the Conventional Commits format
- CHANGELOG automatically groups changes by type
- Version in package.json is updated according to Semantic Versioning

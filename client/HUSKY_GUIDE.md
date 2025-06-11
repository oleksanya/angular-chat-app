
### 🔧 Installed Hooks

1. **pre-commit** - Runs before every commit
   - Formats and lints only staged files (lint-staged)
   - Checks TypeScript compilation
   - Ensures code quality before commit

2. **commit-msg** - Validates commit messages
   - Enforces conventional commit format
   - Ensures consistent commit history

3. **pre-push** - Runs before pushing to remote
   - Runs full test suite
   - Checks production build
   - Prevents broken code from being pushed

## 📝 Conventional Commit Format

Your commits must follow this format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types Available:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting changes

### Examples:
```bash
# Good commit messages ✅
git commit -m "feat: add user authentication"
git commit -m "fix: resolve socket connection issue"
git commit -m "refactor: modernize chat service"
git commit -m "docs: update README with setup instructions"
git commit -m "style: format code with prettier"

# Bad commit messages ❌
git commit -m "update stuff"
git commit -m "Fix bug"
git commit -m "WIP"
```

## 🚀 How It Works

### When You Commit:
1. **Husky triggers pre-commit hook**
2. **lint-staged runs** - only on files you're committing:
   - Runs ESLint with auto-fix
   - Formats with Prettier
3. **TypeScript compilation check**
4. **If everything passes** ✅ - commit proceeds
5. **If anything fails** ❌ - commit is blocked

### When You Push:
1. **Husky triggers pre-push hook**
2. **Runs full test suite**
3. **Checks production build**
4. **If everything passes** ✅ - push proceeds
5. **If anything fails** ❌ - push is blocked

## 💻 Commands

```bash
# Regular development workflow
git add .
git commit -m "feat: add new chat feature"  # Hooks run automatically
git push origin your-branch                 # Hooks run automatically

# Manual validation (what hooks do)
npm run validate                           # Run all checks manually
npm run test:ci                           # Run tests like in pre-push
npm run build                             # Check build like in pre-push

# Skip hooks (NOT RECOMMENDED)
git commit -m "message" --no-verify      # Skip pre-commit
git push --no-verify                     # Skip pre-push
```

## 🔍 Troubleshooting

### If pre-commit fails:
```bash
# Fix linting issues
npm run lint

# Fix formatting
npm run format

# Check what's wrong
npm run lint:check
npm run format:check

# Then commit again
git commit -m "your message"
```

### If pre-push fails:
```bash
# Run tests locally
npm run test:ci

# Fix any failing tests
# Then push again
git push
```

### If commit message fails:
```bash
# Use conventional format
git commit -m "feat: your feature description"
# or
git commit -m "fix: your bug fix description"
```

### Skip hooks temporarily:
```bash
# Skip pre-commit (not recommended)
git commit --no-verify

# Skip pre-push (not recommended)
git push --no-verify
```
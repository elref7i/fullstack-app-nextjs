# Development Guide

This guide covers the development setup, workflow, and best practices for contributing to the project management application.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git
- PostgreSQL database
- Code editor (VS Code recommended)

### Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd fullstack-app-nextjs

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Configure your .env.local file
DATABASE_URL="postgresql://username:password@localhost:5432/project_db"
JWT_SECRET="your-super-secret-jwt-key"
COOKIE_NAME="auth-token"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# 5. Set up the database
npx prisma generate
npx prisma db push
npx prisma db seed

# 6. Start the development server
npm run dev
```

## 🛠️ Development Workflow

### 1. **Feature Development**

```bash
# Create a new feature branch
git checkout -b feature/user-authentication

# Make your changes
# ... code changes ...

# Commit your changes with conventional commits
git commit -m "feat: add user authentication system"

# Push to remote
git push origin feature/user-authentication

# Create a pull request
```

### 2. **Conventional Commits**

Use conventional commit messages for better changelog generation:

```bash
# Format: type(scope): description
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(ui): resolve responsive layout issues"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(api): simplify project creation logic"
```

**Commit Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 3. **Code Quality Checks**

```bash
# Run TypeScript type checking
npm run type-check

# Run ESLint
npm run lint

# Run Prettier formatting
npm run format

# Run all checks
npm run check
```

## 📁 Project Structure Deep Dive

### App Router Structure

```
src/app/
├── (auth)/              # Route groups for authentication
│   ├── layout.tsx       # Shared layout for auth pages
│   ├── register/        # Registration page
│   └── signin/          # Sign in page
├── (dashboard)/         # Route groups for dashboard
│   ├── layout.tsx       # Dashboard layout with sidebar
│   ├── home/            # Home dashboard
│   └── project/         # Project management
├── api/                 # API routes
│   ├── register/        # User registration endpoint
│   ├── signin/          # User authentication endpoint
│   ├── logout/          # User logout endpoint
│   ├── project/         # Project CRUD endpoints
│   └── task/            # Task CRUD endpoints
└── layout.tsx           # Root layout
```

### Component Architecture

```
src/components/
├── ui/                  # Base UI components (shadcn/ui)
│   ├── button.tsx       # Button component
│   ├── card.tsx         # Card component
│   └── input.tsx        # Input component
├── layout/              # Layout components
│   └── sidebar/         # Navigation sidebar
├── providers/           # Context providers
│   └── theme-provider.tsx
├── auth-form.tsx        # Authentication forms
├── project-card.tsx     # Project display
├── task-card.tsx        # Task display
└── user-menu.tsx        # User dropdown menu
```

## 🔧 Development Tools

### VS Code Extensions

Install these extensions for better development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🧪 Testing Strategy

### Testing Levels

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API endpoints and database operations
3. **E2E Tests**: Test complete user workflows

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- user-menu.test.tsx
```

### Test Structure

```typescript
// Example test structure
describe("UserMenu Component", () => {
  describe("when user is logged in", () => {
    it("should display user information", () => {
      // Test implementation
    });

    it("should handle logout", async () => {
      // Test implementation
    });
  });

  describe("when user is not logged in", () => {
    it("should show login prompt", () => {
      // Test implementation
    });
  });
});
```

## 🚀 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze
```

### Performance Monitoring

- Use React DevTools Profiler
- Monitor Core Web Vitals
- Use Lighthouse for performance audits

### Optimization Techniques

1. **Code Splitting**: Use dynamic imports
2. **Image Optimization**: Use Next.js Image component
3. **Caching**: Implement proper caching strategies
4. **Lazy Loading**: Load components on demand

## 🔍 Debugging

### Common Issues

#### 1. **TypeScript Errors**

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Fix auto-fixable issues
npx tsc --noEmit --fix
```

#### 2. **Database Issues**

```bash
# Reset database
npx prisma db push --force-reset

# View database in browser
npx prisma studio

# Generate Prisma client
npx prisma generate
```

#### 3. **Build Issues**

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Tools

- **React DevTools**: Component inspection
- **Network Tab**: API request debugging
- **Console**: Error logging
- **Prisma Studio**: Database inspection

## 📝 Documentation

### Code Documentation

- Use JSDoc comments for functions
- Document complex business logic
- Keep README files updated
- Document API endpoints

### API Documentation

````typescript
/**
 * Create a new project
 *
 * @param projectData - Project creation data
 * @returns Promise with created project
 *
 * @example
 * ```typescript
 * const project = await createProject({
 *   name: "My Project",
 *   description: "Project description"
 * });
 * ```
 */
````

## 🔄 Deployment

### Environment Setup

```bash
# Production environment variables
DATABASE_URL="postgresql://..."
JWT_SECRET="production-secret"
COOKIE_NAME="auth-token"
NEXT_PUBLIC_API_URL="https://your-domain.com"
```

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
```

### Deployment Platforms

- **Vercel**: Recommended for Next.js
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** your changes
5. **Document** your changes
6. **Submit** a pull request

### Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Accessibility considered

## 📚 Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Community Resources

- [Next.js GitHub](https://github.com/vercel/next.js)
- [React GitHub](https://github.com/facebook/react)
- [TypeScript GitHub](https://github.com/microsoft/TypeScript)

---

**Happy Coding! 🚀**

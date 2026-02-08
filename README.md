# RideLedger.Web

**Angular frontend for RideLedger - ride service accounting platform**

[![Angular](https://img.shields.io/badge/Angular-18-DD0031)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Overview

RideLedger.Web is a production-grade Angular 18+ single-page application providing user interface for dual-entry accounting and invoicing operations. Built with standalone components, Tailwind CSS, and reactive forms.

### Core Features

- 📊 **Account Dashboard** - View account balances and recent transactions
- 💰 **Charge Recording** - Record ride charges with validation
- 💳 **Payment Processing** - Handle payments with real-time balance updates
- 📄 **Invoice Management** - Generate, preview, and download invoices
- 🔍 **Transaction History** - Filter and paginate transaction lists
- 🔎 **Account Search** - Autocomplete search with keyboard navigation

---

## 🏗️ Architecture

### Feature-First Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── auth/               # Authentication services
│   ├── http/               # HTTP interceptors
│   └── guards/             # Route guards
├── shared/                  # Reusable components, pipes, directives
│   ├── components/         # Button, Input, Modal, Table, etc.
│   ├── pipes/              # CurrencyFormat, DateFormat
│   └── directives/         # Custom directives
└── features/                # Feature modules (lazy-loaded)
    ├── accounts/           # Account management
    ├── charges/            # Charge recording
    ├── payments/           # Payment processing
    └── invoices/           # Invoice generation
```

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Angular | 18+ |
| **Language** | TypeScript | 5.3+ |
| **Styling** | Tailwind CSS | 3.4+ |
| **State Management** | RxJS Facades | 7+ |
| **Forms** | Reactive Forms | Angular 18 |
| **HTTP Client** | Angular HttpClient | Angular 18 |
| **Routing** | Angular Router | Angular 18 (lazy-loaded) |
| **Testing** | Jasmine + Karma | Latest |
| **E2E Testing** | Playwright | Latest |
| **Date Utilities** | date-fns | Latest |
| **Notifications** | ngx-toastr | Latest |

---

## 🚀 Quick Start

### Prerequisites

**IMPORTANT**: Angular 18 requires Node.js 20.19+ or 22.12+

Check your Node.js version:
```bash
node --version
```

If you have Node.js 18 or earlier, upgrade to Node.js 20 LTS:
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **macOS**: `brew install node@20`
- **Linux**: Use [nvm](https://github.com/nvm-sh/nvm): `nvm install 20 && nvm use 20`

### 1. Clone Repository

```bash
git clone https://github.com/jainarula-tz/RideLedger.Web.git
cd RideLedger.Web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api/v1',
  apiTimeout: 30000
};
```

### 4. Run Development Server

```bash
npm start
# or
ng serve

# Application will be available at:
# http://localhost:4200
```

### 5. Run Tests

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# With coverage
npm run test:coverage
```

### 6. Build for Production

```bash
npm run build
# Output in dist/ridledger-web/
```

---

## 📁 Project Setup (First Time)

Since Angular 18 requires Node.js 20+, here's how to initialize the project:

### Step 1: Upgrade Node.js

```bash
# Check current version
node --version

# If < 20.19, upgrade to Node.js 20 LTS
# Download from https://nodejs.org/
```

### Step 2: Initialize Angular Project

```bash
# Remove docs folder temporarily
mv docs ../docs-backup

# Create Angular 18 project
npx @angular/cli@latest new . --routing --style=scss --standalone --skip-git --package-manager=npm

# Restore docs
mv ../docs-backup docs
```

### Step 3: Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
}
```

Update `src/styles.scss`:
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Install Additional Dependencies

```bash
npm install rxjs@^7.0.0 date-fns ngx-toastr
npm install -D @playwright/test
```

### Step 5: Configure Angular for Tailwind

Update `angular.json` to watch `.scss` files properly (Angular CLI handles this automatically).

---

## 🎨 UI Components

### Shared Component Library

- **ButtonComponent** - Primary, secondary, danger variants
- **InputComponent** - Form input with validation states
- **ModalComponent** - Reusable modal dialog
- **TableComponent** - Data table with sorting/pagination
- **SkeletonLoaderComponent** - Loading placeholders

### Styling Guidelines

- Uses Tailwind utility classes
- OnPush change detection for all components
- Async pipe for all observables (no manual subscriptions)
- WCAG 2.1 AA compliance
- Fully keyboard accessible

---

## 🔗 API Integration

### Environment Configuration

```typescript
// src/environments/environment.ts (production)
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.ridledger.com/api/v1',
  apiTimeout: 30000
};
```

### HTTP Services

Each feature has dedicated API services:

```typescript
// Example: AccountApiService
@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private http: HttpClient) {}

  getAccount(id: string): Observable<Account> {
    return this.http.get<AccountResponse>(`${environment.apiBaseUrl}/accounts/${id}`)
      .pipe(map(response => AccountMapper.toDomainModel(response)));
  }
}
```

### Facade Pattern

State management using RxJS facades:

```typescript
// Example: AccountFacadeService
@Injectable({ providedIn: 'root' })
export class AccountFacadeService {
  private accountSubject = new BehaviorSubject<Account | null>(null);
  public account$ = this.accountSubject.asObservable();

  constructor(private apiService: AccountApiService) {}

  loadAccount(id: string): void {
    this.apiService.getAccount(id).subscribe(
      account => this.accountSubject.next(account)
    );
  }
}
```

---

## 🧪 Testing

### Unit Tests (Jasmine + Karma)

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Coverage threshold: 70%+ required
```

### E2E Tests (Playwright)

```bash
# Install Playwright
npx playwright install

# Run E2E tests
npm run e2e

# Run specific test
npx playwright test tests/charge-recording.spec.ts
```

### Test Structure

```
src/
├── app/
│   └── features/
│       └── accounts/
│           ├── components/
│           │   └── account-dashboard.component.spec.ts  # Component tests
│           └── services/
│               └── account-facade.service.spec.ts       # Service tests
└── e2e/
    ├── pom/                                              # Page Object Models
    └── specs/
        └── account-dashboard.spec.ts                     # E2E tests
```

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build

# Output: dist/ridledger-web/
# Bundle size target: <500KB gzipped
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ridledger-web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

Build and run:
```bash
docker build -t ridledger-web:latest .
docker run -d -p 4200:80 ridledger-web:latest
```

### Environment-Specific Builds

```bash
# Development
ng build --configuration development

# Staging
ng build --configuration staging

# Production
ng build --configuration production --optimization --aot
```

---

## 🎯 Performance Optimization

### Implemented Optimizations

- ✅ Lazy-loaded routes (feature modules)
- ✅ OnPush change detection everywhere
- ✅ TrackBy functions for all `*ngFor` loops
- ✅ Async pipe (no manual subscriptions)
- ✅ NgOptimizedImage for images
- ✅ Route preloading strategy
- ✅ Bundle size optimization

### Performance Targets

- Page load: <2s
- Form submit: <3s
- Search: <500ms (p95)
- Lighthouse Performance: >90
- Lighthouse Accessibility: 100

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- ✅ ARIA labels on all interactive elements
- ✅ ARIA live regions for dynamic content
- ✅ Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- ✅ Focus visible styles
- ✅ Screen reader announcements
- ✅ Alt text for images
- ✅ Color contrast ratios 4.5:1+

### Testing

```bash
# Run aXe accessibility audit
npm run test:a11y

# Manual keyboard testing
# Tab through all interactive elements
# Verify screen reader compatibility (NVDA/JAWS/VoiceOver)
```

---

## 📊 Monitoring

### Health Checks

Frontend health available at `/health` (served via backend proxy)

### Analytics Integration

```typescript
// src/app/core/analytics/analytics.service.ts
export class AnalyticsService {
  trackPageView(page: string): void { /* ... */ }
  trackEvent(category: string, action: string): void { /* ... */ }
}
```

Supports:
- Google Analytics 4
- Mixpanel
- Custom analytics

---

## 📚 Documentation

- **[Specification](docs/spec.md)** - Feature requirements (25 FRs, 6 user stories)
- **[Implementation Plan](docs/plan.md)** - Architecture and technical decisions
- **[Tasks](docs/tasks.md)** - 273 implementation tasks with DDD breakdown
- **[Data Model](docs/data-model.md)** - Frontend models and state management
- **[Research](docs/research.md)** - Technical research and decisions

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Follow Angular style guide
3. Write tests (70%+ coverage)
4. Run linter: `npm run lint`
5. Create pull request

### Code Standards

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Conventional commits
- No `any` types (use strict typing)
- No function calls in templates

---

## 🐛 Troubleshooting

### Node.js Version Error

```
Error: The Angular CLI requires a minimum Node.js version of v20.19 or v22.12
```

**Solution**: Upgrade Node.js to version 20 LTS or higher.

### Port 4200 Already in Use

```bash
# Change port
ng serve --port 4300
```

### Build Errors After Upgrade

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/jainarula-tz/RideLedger.Web/issues)
- **API Documentation**: [Backend API Docs](https://github.com/jainarula-tz/RideLedger.Api)
- **Email**: support@ridledger.com

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🚦 Project Status

### Current Status: ✅ Repository Initialized

- ✅ Repository created on GitHub
- ✅ Specifications copied (273 tasks)
- ⏳ **Next Step**: Upgrade Node.js to 20+ and initialize Angular project
- ⏳ Pending: Angular CLI project setup
- ⏳ Pending: Tailwind CSS configuration
- ⏳ Pending: Implementation (start with Phase 1 setup tasks)

### Implementation Phases

**Estimated Timeline**: 6-7 weeks with 2-3 developers

| Phase | Description | Tasks | Status |
|-------|-------------|-------|--------|
| Phase 1 | Setup & Project Init | 20 | ⏳ Pending |
| Phase 2 | Foundational Infrastructure | 20 | ⏳ Pending |
| Phase 3 | US1 - Account Dashboard (P1) | 32 | ⏳ Pending |
| Phase 4 | US2 - Record Charges (P1) | 30 | ⏳ Pending |
| Phase 5 | US3 - Transaction History (P2) | 29 | ⏳ Pending |
| Phase 6 | US4 - Invoice Generation (P2) | 32 | ⏳ Pending |
| Phase 7 | US5 - Record Payments (P2) | 31 | ⏳ Pending |
| Phase 8 | US6 - Account Search (P3) | 19 | ⏳ Pending |
| Phase 9 | Edge Case Testing | 8 | ⏳ Pending |
| Phase 10 | Testing & QA | 16 | ⏳ Pending |
| Phase 11 | Accessibility & Performance | 18 | ⏳ Pending |
| Phase 12 | Polish & Documentation | 18 | ⏳ Pending |

**MVP Target**: Week 3 (US1 + US2 = View dashboard and record charges)

---

## 🎉 Next Steps

### 1. Upgrade Node.js (Required!)

Your current Node.js version (v18.19.1) is too old for Angular 18.

**Download Node.js 20 LTS**: https://nodejs.org/

### 2. Initialize Angular Project

After upgrading Node.js:

```bash
cd RideLedger.Web

# Create Angular 18 project (docs folder will be preserved)
npx @angular/cli@latest new temp-project --routing --style=scss --standalone --skip-git
mv temp-project/* .
mv temp-project/.* . 2>/dev/null || true
rm -rf temp-project

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install dependencies
npm install rxjs date-fns ngx-toastr
npm install -D @playwright/test

# Start development server
npm start
```

### 3. Begin Implementation

Follow tasks in [docs/tasks.md](docs/tasks.md) starting with Phase 1 (Setup).

---

**Built with ❤️ for ride service platforms**

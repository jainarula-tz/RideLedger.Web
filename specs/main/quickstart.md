# Quickstart: Accounting & Invoicing Frontend (Angular)

**Feature**: 002-accounting-frontend  
**Date**: 2026-02-08

This guide provides setup instructions and development workflows for the Angular frontend application.

---

## Prerequisites

- **Node.js**: 20.x LTS (check with `node --version`)
- **pnpm**: 8.x+ (install with `npm install -g pnpm`)
- **Angular CLI**: 18.x+ (install with `pnpm add -g @angular/cli`)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions (see below)

---

## Initial Setup

### 1. Create Angular Project

```bash
# Navigate to project root
cd angular/

# Create new Angular project with standalone components
ng new accounting-frontend \
  --standalone \
  --routing \
  --style=css \
  --package-manager=pnpm \
  --strict

cd accounting-frontend
```

### 2. Install Dependencies

```bash
# Core dependencies
pnpm add rxjs date-fns ngx-toastr

# Dev dependencies
pnpm add -D @angular-eslint/schematics \
  @angular-eslint/eslint-plugin \
  @angular-eslint/eslint-plugin-template \
  @angular-eslint/template-parser \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-prettier \
  prettier \
  husky \
  lint-staged \
  tailwindcss \
  postcss \
  autoprefixer \
  @playwright/test
```

### 3. Configure Tailwind CSS

```bash
# Initialize Tailwind
npx tailwindcss init
```

**tailwind.config.ts**:
```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
```

**src/styles.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global styles */
body {
  @apply bg-gray-50 text-gray-900;
}
```

### 4. Configure ESLint

```bash
# Initialize ESLint
ng add @angular-eslint/schematics
```

**.eslintrc.cjs**:
```javascript
module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier'
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' }
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        'no-console': ['error', { allow: ['error'] }]
      }
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility'
      ]
    }
  ]
};
```

### 5. Configure Prettier

**.prettierrc**:
```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "trailingComma": "all",
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### 6. Configure TypeScript

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```

### 7. Configure Git Hooks

```bash
# Initialize Husky
npx husky init
```

**.husky/pre-commit**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

**package.json** (add lint-staged config):
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.html": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### 8. Configure Playwright

```bash
# Initialize Playwright
npx playwright install
```

**playwright.config.ts**:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Project Structure Setup

### Create Core Directories

```bash
mkdir -p src/app/core/interceptors
mkdir -p src/app/core/guards
mkdir -p src/app/core/services
mkdir -p src/app/shared/components
mkdir -p src/app/shared/pipes
mkdir -p src/app/shared/directives
mkdir -p src/app/features/accounts/pages
mkdir -p src/app/features/accounts/components
mkdir -p src/app/features/accounts/services
mkdir -p src/app/features/accounts/models
mkdir -p src/app/features/charges/pages
mkdir -p src/app/features/charges/components
mkdir -p src/app/features/charges/services
mkdir -p src/app/features/payments/pages
mkdir -p src/app/features/invoices/pages
mkdir -p e2e/fixtures
mkdir -p e2e/tests
```

---

## Development Workflow

### Start Development Server

```bash
pnpm start

# Or with specific port
ng serve --port 4200
```

Access at: `http://localhost:4200`

### Run Linter

```bash
# Check all files
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### Run Unit Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (during development)
pnpm test --watch

# Run tests with coverage
pnpm test --code-coverage
```

### Run E2E Tests

```bash
# Run all E2E tests (headless)
pnpm e2e

# Run E2E tests with UI
pnpm playwright test --ui

# Run specific test file
pnpm playwright test account-dashboard.spec.ts

# Debug mode
pnpm playwright test --debug
```

### Format Code

```bash
# Check formatting
pnpm format:check

# Fix formatting
pnpm format:write
```

### Build for Production

```bash
# Build with optimizations
pnpm build

# Build output in dist/
```

---

## Component Generation

### Create Feature Component

```bash
# Create standalone component
ng generate component features/accounts/pages/account-dashboard --standalone

# Create component with OnPush
ng generate component features/accounts/components/account-card \
  --standalone \
  --change-detection=OnPush
```

### Create Service

```bash
# Create service in core
ng generate service core/services/api

# Create facade service in feature
ng generate service features/accounts/services/account-facade
```

### Create Pipe

```bash
# Create standalone pipe
ng generate pipe shared/pipes/currency-format --standalone
```

### Create Directive

```bash
# Create standalone directive
ng generate directive shared/directives/auto-focus --standalone
```

---

## Environment Configuration

**src/environments/environment.ts** (development):
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api/v1',
  apiTimeout: 30000,
};
```

**src/environments/environment.prod.ts** (production):
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.example.com/api/v1',
  apiTimeout: 30000,
};
```

---

## API Integration Setup

### Configure HTTP Interceptors

**src/app/app.config.ts**:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        loadingInterceptor
      ])
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    })
  ]
};
```

### Create API Service

**src/app/core/services/api.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
```

---

## Testing Patterns

### Unit Test Example

**account-card.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCardComponent } from './account-card.component';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;

  const mockAccount: Account = {
    id: 'test-123',
    name: 'Test Hospital',
    type: AccountType.Organization,
    status: AccountStatus.Active,
    balance: 1234.56,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    component.account = mockAccount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-testid="account-name"]').textContent)
      .toContain('Test Hospital');
  });

  it('should format balance as currency', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-testid="account-balance"]').textContent)
      .toContain('$1,234.56');
  });
});
```

### E2E Test Example

**e2e/tests/record-charge.spec.ts**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Record Charge Workflow', () => {
  test('should record a charge successfully', async ({ page }) => {
    await page.goto('/accounts/test-account-123');
    
    await page.click('[data-testid="record-charge-btn"]');
    
    await page.fill('[data-testid="ride-id-input"]', 'RIDE-001');
    await page.fill('[data-testid="fare-amount-input"]', '45.50');
    await page.fill('[data-testid="service-date-input"]', '2026-02-08');
    
    await page.click('[data-testid="submit-charge-btn"]');
    
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('[data-testid="account-balance"]')).toContainText('$45.50');
  });

  test('should show validation error for negative amount', async ({ page }) => {
    await page.goto('/accounts/test-account-123');
    await page.click('[data-testid="record-charge-btn"]');
    
    await page.fill('[data-testid="fare-amount-input"]', '-10');
    await page.click('[data-testid="submit-charge-btn"]');
    
    await expect(page.locator('[data-testid="fare-amount-error"]'))
      .toContainText('must be a positive number');
  });
});
```

---

## VS Code Extensions (Recommended)

Install these extensions for optimal development experience:

- **Angular Language Service**: Angular.ng-template
- **ESLint**: dbaeumer.vscode-eslint
- **Prettier**: esbenp.prettier-vscode
- **Tailwind CSS IntelliSense**: bradlc.vscode-tailwindcss
- **Playwright Test for VSCode**: ms-playwright.playwright
- **Auto Rename Tag**: formulahendry.auto-rename-tag
- **Path Intellisense**: christian-kohler.path-intellisense

---

## Scripts Reference

Add these to **package.json**:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test --watch=false",
    "test:watch": "ng test",
    "test:coverage": "ng test --code-coverage",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "format:check": "prettier --check \"src/**/*.{ts,html,css}\"",
    "format:write": "prettier --write \"src/**/*.{ts,html,css}\"",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:debug": "playwright test --debug"
  }
}
```

---

## CI/CD Pipeline Example

**.github/workflows/frontend-ci.yml**:
```yaml
name: Frontend CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Lint
        run: pnpm lint
        
      - name: Format check
        run: pnpm format:check
        
      - name: Build
        run: pnpm build
        
      - name: Unit tests
        run: pnpm test
        
      - name: E2E tests
        run: pnpm e2e
        
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Troubleshooting

### Issue: `ng` command not found
```bash
pnpm add -g @angular/cli
```

### Issue: Port 4200 already in use
```bash
ng serve --port 4201
```

### Issue: Tailwind styles not applying
- Verify `tailwind.config.ts` content paths
- Check `styles.css` has `@tailwind` directives
- Restart dev server

### Issue: Playwright tests failing
```bash
# Reinstall browsers
npx playwright install

# Update Playwright
pnpm add -D @playwright/test@latest
```

---

## Next Steps

1. **Set up routing**: Configure routes in `app.routes.ts`
2. **Create shared components**: Button, Input, Modal, Table, Skeleton Loader
3. **Implement feature pages**: Account Dashboard, Record Charge, Record Payment
4. **Add API integration**: Account API, Charge API, Payment API, Invoice API
5. **Write unit tests**: Aim for 70%+ coverage
6. **Write E2E tests**: Cover critical workflows
7. **Deploy**: Configure build for production environment

---

## Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Playwright Documentation](https://playwright.dev)
- [date-fns Documentation](https://date-fns.org)

**Status**: ✅ Development environment ready

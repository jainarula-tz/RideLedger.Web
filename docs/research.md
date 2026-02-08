# Research: Accounting & Invoicing Frontend (Angular)

**Feature**: 002-accounting-frontend  
**Research Date**: 2026-02-08  
**Status**: Complete

## Research Tasks

This document resolves all technical clarifications and unknowns for implementing the Angular frontend application.

---

## 1. State Management Strategy

**Research Task**: Determine state management approach for Angular application.

### Decision: RxJS Facade Services (No NgRx)

**Rationale**: The application scope is moderate with straightforward CRUD operations. RxJS facade services provide sufficient state management without the complexity and boilerplate of NgRx. Facades encapsulate API calls, caching, and state updates while exposing observables to components.

**Implementation Pattern**:
```typescript
@Injectable({ providedIn: 'root' })
export class AccountFacadeService {
  private readonly _currentAccount$ = new BehaviorSubject<Account | null>(null);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  private readonly _error$ = new BehaviorSubject<string | null>(null);
  
  readonly currentAccount$ = this._currentAccount$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly error$ = this._error$.asObservable();
  
  constructor(
    private accountApi: AccountApiService,
    private notification: NotificationService
  ) {}
  
  loadAccount(accountId: string): void {
    this._loading$.next(true);
    this._error$.next(null);
    
    this.accountApi.getAccount(accountId).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (account) => {
        this._currentAccount$.next(account);
        this._loading$.next(false);
      },
      error: (error) => {
        this._error$.next(error.message);
        this._loading$.next(false);
        this.notification.error('Failed to load account');
      }
    });
  }
}
```

**Alternatives Considered**:
- **NgRx Store**: Rejected—too much boilerplate for moderate app complexity. Actions, reducers, effects, and selectors would add development overhead without sufficient benefit.
- **Signals-based State**: Rejected for v1.0 because RxJS observables integrate better with async pipe and existing Angular patterns. Consider for v2.0 when Signals mature.
- **ComponentStore**: Rejected—adds dependency and learning curve. RxJS services are sufficient for component-scoped state.

---

## 2. Form Validation Strategy

**Research Task**: Design reusable validation approach for Reactive Forms.

### Decision: Custom Validators + Error Message Service

**Rationale**: Reactive Forms provide built-in validators, but custom business rules (e.g., "amount must be positive", "date cannot be in future") require custom validators. Centralizing error message generation ensures consistency across forms.

**Implementation Approach**:

**Custom Validators**:
```typescript
export class CustomValidators {
  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value !== null && value !== undefined && value <= 0) {
      return { positiveNumber: { value } };
    }
    return null;
  }
  
  static maxDecimals(decimals: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && value !== undefined) {
        const regex = new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`);
        if (!regex.test(value.toString())) {
          return { maxDecimals: { required: decimals, actual: value } };
        }
      }
      return null;
    };
  }
  
  static notFutureDate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && new Date(value) > new Date()) {
      return { futureDate: true };
    }
    return null;
  }
}
```

**Error Message Service**:
```typescript
@Injectable({ providedIn: 'root' })
export class FormErrorService {
  getErrorMessage(fieldName: string, errors: ValidationErrors | null): string {
    if (!errors) return '';
    
    const errorKey = Object.keys(errors)[0];
    const errorMessages: Record<string, string> = {
      required: `${fieldName} is required`,
      positiveNumber: `${fieldName} must be a positive number`,
      maxDecimals: `${fieldName} can have max ${errors['maxDecimals'].required} decimal places`,
      futureDate: `${fieldName} cannot be in the future`,
      min: `${fieldName} must be at least ${errors['min'].min}`,
      max: `${fieldName} must be at most ${errors['max'].max}`,
    };
    
    return errorMessages[errorKey] || 'Invalid value';
  }
}
```

**Form Component Usage**:
```typescript
this.chargeForm = this.fb.group({
  rideId: ['', [Validators.required]],
  fareAmount: ['', [
    Validators.required,
    CustomValidators.positiveNumber,
    CustomValidators.maxDecimals(2)
  ]],
  serviceDate: ['', [Validators.required, CustomValidators.notFutureDate]],
  fleetId: [''],
  description: ['']
});
```

**Alternatives Considered**:
- **Template-driven Forms**: Rejected—reactive forms provide better type safety, testability, and dynamic validation control.
- **Third-party Validation Library (ngx-valdemort, etc.)**: Rejected—adds dependency for simple use case. Custom validators are lightweight and sufficient.

---

## 3. API Client Architecture

**Research Task**: Design HTTP client layer for backend API integration.

### Decision: Typed API Service + HTTP Interceptors

**Rationale**: Encapsulate API calls in typed services for maintainability and testability. HTTP interceptors handle cross-cutting concerns (auth tokens, error handling, loading states).

**API Service Pattern**:
```typescript
export interface AccountResponse {
  accountId: string;
  name: string;
  type: 'Organization' | 'Individual';
  status: 'Active' | 'Inactive';
  currentBalance: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private readonly baseUrl = '/api/v1/accounts';
  
  constructor(private http: HttpClient) {}
  
  getAccount(accountId: string): Observable<Account> {
    return this.http.get<AccountResponse>(`${this.baseUrl}/${accountId}`).pipe(
      map(response => this.mapToAccount(response)),
      catchError(error => this.handleError(error))
    );
  }
  
  private mapToAccount(response: AccountResponse): Account {
    return {
      id: response.accountId,
      name: response.name,
      type: response.type,
      status: response.status,
      balance: response.currentBalance,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt)
    };
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error?.title) {
      errorMessage = error.error.title;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
```

**HTTP Interceptors**:

1. **Auth Interceptor** (add JWT token):
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Token handled by HTTP-only cookie; no manual header injection needed
  return next(req);
};
```

2. **Error Interceptor** (global error handling):
```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Redirect to login
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

3. **Loading Interceptor** (global loading state):
```typescript
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
```

**Alternatives Considered**:
- **Generated API Client (OpenAPI Generator)**: Rejected for v1.0—adds build complexity. Manually typed services provide better control. Consider for v2.0.
- **GraphQL Client**: Rejected—backend uses REST. GraphQL adds unnecessary complexity.

---

## 4. Loading State Management

**Research Task**: Design loading and skeleton loader patterns.

### Decision: Component-Level Loading States + Global Spinner

**Rationale**: Combine component-level skeleton loaders for data-heavy sections (transaction lists, dashboards) with global spinner for quick operations (form submissions). This provides visual feedback without jarring full-page spinners for every operation.

**Implementation**:

**Skeleton Loader Component**:
```typescript
@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  template: `
    <div class="animate-pulse">
      <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoaderComponent {}
```

**Component Usage**:
```typescript
@Component({
  template: `
    @if (loading$ | async) {
      <app-skeleton-loader />
    } @else {
      <div class="account-card">
        <h2>{{ (account$ | async)?.name }}</h2>
        <p>Balance: {{ (account$ | async)?.balance | currency }}</p>
      </div>
    }
  `
})
export class AccountDashboardComponent {
  loading$ = this.facade.loading$;
  account$ = this.facade.currentAccount$;
  
  constructor(private facade: AccountFacadeService) {}
}
```

**Global Loading Service** (for form submissions):
```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = 0;
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();
  
  show(): void {
    this.loadingCount++;
    this._loading$.next(true);
  }
  
  hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      this._loading$.next(false);
    }
  }
}
```

**Alternatives Considered**:
- **Suspense-like Loading (Angular Defer)**: Rejected—too early in Angular roadmap. Stick with established observable patterns.
- **Third-party Loading Library (ngx-spinner)**: Rejected—adds dependency for simple spinner. Custom service is lightweight.

---

## 5. Notification/Toast System

**Research Task**: Select toast notification library and design integration.

### Decision: ngx-toastr with Custom Configuration

**Rationale**: ngx-toastr is battle-tested, lightweight, accessible, and supports auto-dismiss + queue management. Integrates easily with Angular dependency injection.

**Installation**:
```bash
pnpm add ngx-toastr
```

**Configuration** (app.config.ts):
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true
    })
  ]
};
```

**Notification Service Wrapper**:
```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: ToastrService) {}
  
  success(message: string, title?: string): void {
    this.toastr.success(message, title);
  }
  
  error(message: string, title?: string): void {
    this.toastr.error(message, title || 'Error');
  }
  
  warning(message: string, title?: string): void {
    this.toastr.warning(message, title);
  }
  
  info(message: string, title?: string): void {
    this.toastr.info(message, title);
  }
}
```

**Alternatives Considered**:
- **Angular Material Snackbar**: Rejected—Material brings heavy dependency. ngx-toastr is more lightweight.
- **Custom Toast Component**: Rejected—reinvents wheel. ngx-toastr handles accessibility, positioning, stacking, auto-dismiss.

---

## 6. Date Handling Library

**Research Task**: Select date utility library for date manipulation and formatting.

### Decision: date-fns

**Rationale**: date-fns is modular (tree-shakable), immutable, type-safe with TypeScript, and has no prototype pollution. Smaller bundle size than moment.js.

**Installation**:
```bash
pnpm add date-fns
```

**Usage Patterns**:
```typescript
import { format, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';

// Format dates for display
format(new Date(), 'MMM dd, yyyy'); // "Feb 08, 2026"

// Parse ISO strings from API
parseISO('2026-02-08T10:30:00Z');

// Date comparisons
isAfter(serviceDate, new Date()); // Check if future date

// Date manipulations
startOfDay(new Date()); // Get start of day in local timezone
```

**Custom Pipe**:
```typescript
@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null, formatString: string = 'MMM dd, yyyy'): string {
    if (!value) return '';
    const date = typeof value === 'string' ? parseISO(value) : value;
    return format(date, formatString);
  }
}
```

**Alternatives Considered**:
- **moment.js**: Rejected—large bundle size, no tree-shaking, mutable API.
- **Luxon**: Rejected—heavier than date-fns for our use case.
- **native Date API only**: Rejected—lacks utility functions, harder to work with timezones.

---

## 7. Accessibility Implementation

**Research Task**: Define accessibility strategy for WCAG 2.1 AA compliance.

### Decision: Built-in Angular Accessibility + aria-live Regions

**Rationale**: Angular provides strong accessibility foundations. Focus on semantic HTML, ARIA attributes, keyboard navigation, and screen reader announcements for dynamic content.

**Implementation Checklist**:

1. **Form Labels and Errors**:
```typescript
<label for="rideId" class="block text-sm font-medium">
  Ride ID <span class="text-red-500">*</span>
</label>
<input 
  id="rideId"
  type="text"
  formControlName="rideId"
  [attr.aria-invalid]="rideIdControl.invalid && rideIdControl.touched"
  [attr.aria-describedby]="rideIdControl.invalid ? 'rideId-error' : null"
  class="mt-1 block w-full border-gray-300 rounded-md"
/>
@if (rideIdControl.invalid && rideIdControl.touched) {
  <p id="rideId-error" class="mt-1 text-sm text-red-600" role="alert">
    {{ getErrorMessage('Ride ID', rideIdControl.errors) }}
  </p>
}
```

2. **Keyboard Navigation**:
```typescript
@HostListener('keydown.enter', ['$event'])
handleEnter(event: KeyboardEvent): void {
  if (!this.chargeForm.invalid) {
    this.onSubmit();
  }
}

@HostListener('keydown.escape')
handleEscape(): void {
  this.onCancel();
}
```

3. **ARIA Live Regions** (for dynamic updates):
```typescript
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {{ announceMessage$ | async }}
</div>
```

4. **Focus Management**:
```typescript
@ViewChild('firstInput') firstInput!: ElementRef;

ngAfterViewInit(): void {
  this.firstInput.nativeElement.focus();
}
```

5. **Testing with aXe**:
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('account dashboard is accessible', async ({ page }) => {
  await page.goto('/accounts/123');
  await injectAxe(page);
  await checkA11y(page);
});
```

**Alternatives Considered**:
- **Third-party A11y Library (ngx-a11y)**: Rejected—Angular's built-in features are sufficient. No need for extra dependency.

---

## 8. Responsive Design Strategy

**Research Task**: Define responsive layout approach with Tailwind CSS.

### Decision: Tailwind Responsive Utilities + Container Queries (Future)

**Rationale**: Tailwind's responsive prefixes (sm:, md:, lg:, xl:) provide mobile-first responsive design. Combine with CSS Grid and Flexbox for adaptive layouts.

**Implementation Patterns**:

**Responsive Grid**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <app-account-card *ngFor="let account of accounts" [account]="account" />
</div>
```

**Responsive Typography**:
```html
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">Account Dashboard</h1>
```

**Responsive Form Layouts**:
```html
<form class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label>Ride ID</label>
      <input />
    </div>
    <div>
      <label>Fare Amount</label>
      <input />
    </div>
  </div>
</form>
```

**Breakpoints** (tailwind.config.ts):
```typescript
export default {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

**Alternatives Considered**:
- **Bootstrap Grid**: Rejected—Tailwind provides utilities without framework overhead.
- **CSS-in-JS**: Rejected—Tailwind scoped classes are simpler and performant.

---

## 9. E2E Testing with Playwright

**Research Task**: Design E2E test strategy and setup.

### Decision: Playwright with Page Object Model

**Rationale**: Playwright provides reliable cross-browser testing, auto-wait, screenshot/video capture, and parallel execution. Page Object Model (POM) encapsulates page interactions for maintainability.

**Installation**:
```bash
pnpm add -D @playwright/test
npx playwright install
```

**Page Object Example**:
```typescript
export class AccountDashboardPage {
  constructor(private page: Page) {}
  
  async navigate(accountId: string) {
    await this.page.goto(`/accounts/${accountId}`);
  }
  
  async getBalance(): Promise<string> {
    return this.page.locator('[data-testid="account-balance"]').textContent();
  }
  
  async clickRecordCharge() {
    await this.page.locator('[data-testid="record-charge-btn"]').click();
  }
  
  async waitForTransactionList() {
    await this.page.locator('[data-testid="transaction-list"]').waitFor();
  }
}
```

**E2E Test Example**:
```typescript
test('record charge workflow', async ({ page }) => {
  const dashboard = new AccountDashboardPage(page);
  const chargeForm = new ChargeFormPage(page);
  
  await dashboard.navigate('test-account-123');
  await dashboard.clickRecordCharge();
  
  await chargeForm.fillRideId('RIDE-001');
  await chargeForm.fillFareAmount('45.50');
  await chargeForm.fillServiceDate('2026-02-08');
  await chargeForm.submit();
  
  await expect(page.locator('.toast-success')).toBeVisible();
  await expect(dashboard.getBalance()).resolves.toBe('$45.50');
});
```

**Alternatives Considered**:
- **Cypress**: Rejected—Playwright has better TypeScript support and cross-browser coverage.
- **Selenium**: Rejected—Playwright provides better developer experience and modern APIs.

---

## 10. Bundle Optimization

**Research Task**: Define bundle size optimization strategy.

### Decision: Lazy Loading + Code Splitting + Tree Shaking

**Rationale**: Angular CLI provides excellent build optimization out-of-the-box. Enable lazy loading for routes, use standalone components to avoid unnecessary module bundling, and configure budgets to enforce size limits.

**Route Configuration with Lazy Loading**:
```typescript
export const routes: Routes = [
  {
    path: 'accounts/:id',
    loadComponent: () => import('./features/accounts/pages/account-dashboard/account-dashboard.component')
      .then(m => m.AccountDashboardComponent)
  },
  {
    path: 'charges/new',
    loadComponent: () => import('./features/charges/pages/record-charge/record-charge.component')
      .then(m => m.RecordChargeComponent)
  }
];
```

**Budget Configuration** (angular.json):
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "6kb",
      "maximumError": "10kb"
    }
  ]
}
```

**Tree Shaking with date-fns**:
```typescript
// ✅ Good: imports only needed functions
import { format, parseISO } from 'date-fns';

// ❌ Bad: imports entire library
import * as dateFns from 'date-fns';
```

**Alternatives Considered**:
- **Manual Code Splitting with Webpack**: Rejected—Angular CLI handles optimization. Manual configuration adds complexity.

---

## Summary of Decisions

| Research Area | Decision | Rationale |
|---------------|----------|-----------|
| State Management | RxJS Facade Services | Sufficient for moderate complexity, no NgRx overhead |
| Form Validation | Custom Validators + Error Service | Reusable, type-safe, centralized error messages |
| API Client | Typed Services + HTTP Interceptors | Encapsulation, testability, cross-cutting concerns |
| Loading States | Skeleton Loaders + Global Spinner | Visual feedback without jarring full-page spinners |
| Notifications | ngx-toastr | Battle-tested, accessible, lightweight |
| Date Handling | date-fns | Modular, tree-shakable, immutable, type-safe |
| Accessibility | Built-in Angular + ARIA | WCAG 2.1 AA compliance, semantic HTML, keyboard nav |
| Responsive Design | Tailwind Responsive Utilities | Mobile-first, utility-driven, no framework overhead |
| E2E Testing | Playwright with POM | Reliable, cross-browser, modern APIs |
| Bundle Optimization | Lazy Loading + Code Splitting | Angular CLI optimization, route-based splitting |

**Status**: ✅ Ready for Phase 1 (Design & Contracts)

# Implementation Plan: Accounting & Invoicing Frontend

**Branch**: `frontend-web` | **Date**: 2026-02-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/frontend-web/spec.md`

**Note**: This is an Angular frontend application that complements the backend Accounting Service (feature 001-accounting-invoicing).

## Summary

Build a production-grade Angular 18+ frontend application providing user interface for dual-entry accounting and invoicing operations. The application uses standalone components, Tailwind CSS for styling, reactive forms with validation, and connects to the .NET backend Accounting Service via REST APIs. The frontend implements comprehensive loading states, error handling, accessibility features (WCAG 2.1 AA), keyboard navigation, and responsive layouts for desktop/tablet/mobile. All components use OnPush change detection, the async pipe for subscriptions, and follow strict TypeScript compilation. The application includes unit tests (Jasmine/Jest) and E2E tests (Playwright) with 70%+ coverage targets.

## Technical Context

**Language/Version**: TypeScript 5.3+ with strict mode enabled, Node.js 20.x LTS  
**Primary Dependencies**: Angular 18+ (standalone components), RxJS 7+, Tailwind CSS 3.4+, Angular Router, Angular Reactive Forms, date-fns (date utilities), ngx-toastr (notifications)  
**Storage**: Browser localStorage for user preferences only (no sensitive data), HTTP-only cookies for auth tokens  
**Testing**: Jasmine + Karma for unit tests (or Jest as alternative), Playwright for E2E tests, Angular Testing Utilities  
**Target Platform**: Modern browsers (Chrome 100+, Firefox 100+, Safari 15+, Edge 100+), responsive web (desktop 1920px, tablet 768px, mobile 375px)  
**Project Type**: Single-page application (SPA) with feature-first architecture, lazy-loaded routes  
**Performance Goals**: Page load <2s, Form submit <3s, Search <500ms (p95), Lighthouse Performance >90, Accessibility 100, Initial bundle <500KB gzipped  
**Constraints**: WCAG 2.1 AA compliance, Keyboard-only navigation support, OnPush change detection, No function calls in templates, 70%+ unit test coverage  
**Scale/Scope**: Support 10,000+ accounts per tenant, Handle transaction lists with 1000+ entries via pagination, Real-time form validation, Graceful offline handling

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Production-Grade Code Mandate ✅ PASS
- **Status**: Compliant
- **Evidence**: Lazy loading for routes, OnPush change detection, Tailwind CSS with proper configuration, TypeScript strict mode, Lighthouse performance budgets enforced, accessibility testing with Lighthouse/aXe

### Feature/Domain-First Architecture ✅ PASS
- **Status**: Compliant
- **Evidence**: Feature folders contain pages/components/services/models, standalone components as default, shared components only for reusable UI (≥2 features)

### Security by Default ✅ PASS
- **Status**: Compliant
- **Evidence**: No innerHTML usage, Angular DomSanitizer for any dynamic content, input validation (UX only, server is source of truth), HTTPS for API calls, no secrets in frontend, CSP headers enforced

### Performance-First Design ✅ PASS
- **Status**: Compliant
- **Evidence**: OnPush change detection, trackBy for ngFor lists, async pipe for subscriptions, route-level code splitting, lazy loading, NgOptimizedImage for images, Lighthouse Performance >90 target

### TypeScript Strict Mode & .NET Strong Typing ✅ PASS (Frontend Only)
- **Status**: Compliant
- **Evidence**: strict: true in tsconfig.json, no 'any' types, unknown for untrusted API data, strong typing at boundaries (HTTP responses, route params, form values)

### Frontend Architecture Standards ✅ PASS
- **Status**: Compliant
- **Evidence**: Component quality requirements (a11y, single responsibility, OnPush, isolated styling), reactive forms for complex forms, validation with clear error messages, debounced inputs, proper form state indicators

### Testing Requirements ✅ PASS
- **Status**: Compliant
- **Evidence**: Unit tests for services/components/pipes, component tests with variant states (loading/error/empty/success), E2E tests for critical paths, stable selectors (data-testid), 70%+ coverage target

### RxJS & State Management ✅ PASS
- **Status**: Compliant
- **Evidence**: async pipe preferred in templates, takeUntilDestroyed() for manual subscriptions, no subscription leaks, RxJS facade services for state management

### Forms Standard ✅ PASS
- **Status**: Compliant
- **Evidence**: Reactive forms for non-trivial forms, typed form models, validation at boundaries (sync/async validators), accessible labels and error messages

### Code Quality Standards ✅ PASS
- **Status**: Compliant
- **Evidence**: ESLint with Angular rules, Prettier formatting, import ordering, naming conventions (PascalCase classes, camelCase variables, kebab-case selectors)

**GATE EVALUATION**: ✅ **PASS** - All frontend gates compliant. Ready for Phase 0 research.

**POST-PHASE 1 RE-EVALUATION**: ✅ **CONFIRMED** - All constitution gates pass with research-backed decisions. Design artifacts (research.md, data-model.md, quickstart.md) complete and aligned with Angular best practices and constitutional principles. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/frontend-web/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (frontend models)
├── quickstart.md        # Phase 1 output (development guide)
└── contracts/           # Phase 1 output (API client interfaces)
```

### Source Code (repository root)

```text
angular/
├── src/
│   ├── app/
│   │   ├── core/                          # Singleton services, interceptors, guards
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── shared/                        # Reusable UI components, pipes, directives
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   ├── modal/
│   │   │   │   ├── table/
│   │   │   │   ├── skeleton-loader/
│   │   │   │   └── toast/
│   │   │   ├── pipes/
│   │   │   │   ├── currency-format.pipe.ts
│   │   │   │   └── date-format.pipe.ts
│   │   │   ├── directives/
│   │   │   │   └── auto-focus.directive.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── features/                      # Feature modules / standalone areas
│   │   │   ├── accounts/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── account-dashboard/
│   │   │   │   │   ├── account-search/
│   │   │   │   │   └── transaction-history/
│   │   │   │   ├── components/
│   │   │   │   │   ├── account-summary-card/
│   │   │   │   │   ├── transaction-list/
│   │   │   │   │   ├── transaction-filter/
│   │   │   │   │   └── balance-indicator/
│   │   │   │   ├── services/
│   │   │   │   │   ├── account-facade.service.ts
│   │   │   │   │   └── account-api.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── account.model.ts
│   │   │   │   │   ├── transaction.model.ts
│   │   │   │   │   └── filter.model.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── charges/
│   │   │   │   ├── pages/
│   │   │   │   │   └── record-charge/
│   │   │   │   ├── components/
│   │   │   │   │   ├── charge-form/
│   │   │   │   │   └── charge-summary/
│   │   │   │   ├── services/
│   │   │   │   │   ├── charge-facade.service.ts
│   │   │   │   │   └── charge-api.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── charge-form.model.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── payments/
│   │   │   │   ├── pages/
│   │   │   │   │   └── record-payment/
│   │   │   │   ├── components/
│   │   │   │   │   ├── payment-form/
│   │   │   │   │   └── payment-confirmation/
│   │   │   │   ├── services/
│   │   │   │   │   ├── payment-facade.service.ts
│   │   │   │   │   └── payment-api.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── payment-form.model.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── invoices/
│   │   │       ├── pages/
│   │   │       │   ├── invoice-list/
│   │   │       │   └── invoice-detail/
│   │   │       ├── components/
│   │   │       │   ├── invoice-generator/
│   │   │       │   ├── invoice-preview/
│   │   │       │   └── invoice-line-items/
│   │   │       ├── services/
│   │   │       │   ├── invoice-facade.service.ts
│   │   │       │   └── invoice-api.service.ts
│   │   │       ├── models/
│   │   │       │   ├── invoice.model.ts
│   │   │       │   └── invoice-form.model.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── app.routes.ts                  # Route configuration
│   │   ├── app.config.ts                  # App-wide providers
│   │   └── app.component.ts               # Root component
│   │
│   ├── styles.css                         # Tailwind entry + global styles
│   ├── main.ts                            # Application bootstrap
│   └── index.html
│
├── e2e/                                   # Playwright tests
│   ├── fixtures/
│   ├── tests/
│   │   ├── account-dashboard.spec.ts
│   │   ├── record-charge.spec.ts
│   │   ├── record-payment.spec.ts
│   │   └── invoice-generation.spec.ts
│   └── playwright.config.ts
│
├── .editorconfig
├── .eslintrc.cjs
├── .prettierrc
├── .nvmrc
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── angular.json
├── package.json
└── README.md
```

**Structure Decision**: Adopting feature-first architecture for Angular SPA with standalone components. The three-layer separation (core, shared, features) prevents circular dependencies and enforces clear boundaries. Core contains singletons (API service, notification service, interceptors, guards). Shared contains reusable UI components used across ≥2 features. Features contain business logic organized by domain (accounts, charges, payments, invoices) with pages/components/services/models co-located. Each feature is lazy-loaded via route configuration. This structure supports the Constitution's requirement for domain-first architecture and enables independent development/testing of features.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: No violations. All constitution gates pass without exceptions.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No complexity violations in this feature | All architecture decisions align with Angular best practices and constitutional principles |

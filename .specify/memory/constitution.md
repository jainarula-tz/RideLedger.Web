# RideLedger Frontend Constitution

## Core Principles

### I. Production-Grade Code Mandate
All frontend code MUST implement lazy loading for routes. All components MUST use OnPush change detection strategy. All lists MUST use trackBy functions. Tailwind CSS MUST be configured with proper purging. TypeScript strict mode MUST be enabled. Lighthouse Performance score MUST exceed 90. Accessibility score MUST be 100.

### II. Feature/Domain-First Architecture
Features MUST be organized in feature folders containing pages, components, services, and models co-located. Core MUST contain only singleton services (API service, notification service, interceptors, guards). Shared MUST contain only reusable UI components used across ≥2 features. Standalone components are mandatory as default.

### III. Security by Default
No innerHTML usage is permitted. Angular DomSanitizer MUST be used for any dynamic content. Input validation MUST occur at boundaries (UX only, server is source of truth). All API calls MUST use HTTPS. No secrets in frontend code. CSP headers MUST be enforced via server configuration.

### IV. Performance-First Design
All components MUST use OnPush change detection. All lists MUST implement trackBy functions. All subscriptions MUST use async pipe in templates. Route-level code splitting MUST be implemented via lazy loading. NgOptimizedImage MUST be used for images. Lighthouse Performance score >90 is mandatory.

### V. TypeScript Strict Mode & Strong Typing
tsconfig.json MUST enable strict mode (strict: true, noImplicitAny: true, strictNullChecks: true). The 'any' type is forbidden. Unknown MUST be used for untrusted API data. Strong typing MUST be enforced at boundaries (HTTP responses, route params, form values).

### VI. Frontend Architecture Standards
Components MUST meet quality requirements: accessibility (WCAG 2.1 AA), single responsibility, OnPush change detection, isolated styling (no global styles). Reactive forms MUST be used for complex forms. Validation MUST provide clear error messages. Debounced inputs MUST be used for search/autocomplete. Proper form state indicators (pristine, dirty, touched, valid) MUST be displayed.

### VII. Testing Requirements
Unit tests MUST cover services, components, and pipes. Component tests MUST cover variant states (loading, error, empty, success). E2E tests MUST cover critical user paths. Stable selectors (data-testid) MUST be used in tests. Minimum 70% code coverage is required.

### VIII. RxJS & State Management
Async pipe MUST be preferred in templates over manual subscriptions. takeUntilDestroyed() MUST be used for manual subscriptions to prevent leaks. No subscription leaks are permitted. RxJS facade services MUST be used for state management.

### IX. Forms Standard
Reactive forms MUST be used for non-trivial forms (>2 fields). Typed form models MUST be used. Validation MUST occur at boundaries (sync validators, async validators). Accessible labels and error messages (aria-describedby) are mandatory.

### X. Code Quality Standards
ESLint with Angular rules MUST be configured and pass with zero errors. Prettier formatting MUST be enforced. Import ordering MUST follow convention. Naming conventions are mandatory: PascalCase for classes, camelCase for variables/functions, kebab-case for component selectors.

## Quality Gates

### Performance Thresholds
- Page load: <2 seconds
- Form submission: <3 seconds
- Search results: <500ms (p95)
- Lighthouse Performance: >90
- Initial bundle: <500KB gzipped

### Accessibility Standards
- WCAG 2.1 AA compliance
- Lighthouse Accessibility: 100
- Keyboard navigation support
- Screen reader compatibility

### Testing Standards
- Unit test coverage: 70% minimum
- Component variant coverage: loading, error, empty, success states
- E2E tests for critical user flows

### Browser Support
- Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- Last 2 major versions

## Governance

This constitution supersedes all other development practices. Any architecture decision requiring exception to these principles MUST be documented in plan.md Complexity Tracking section with explicit justification.

All pull requests MUST verify constitutional compliance before merge. Complexity requiring deviation from principles MUST be justified with simpler alternatives documented.

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08

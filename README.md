# RideLedger.Web

**Angular 16 frontend for RideLedger - ride service accounting platform**

[![Angular](https://img.shields.io/badge/Angular-16-DD0031)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

---

## 📋 Overview

Production-grade Angular 16 single-page application for dual-entry accounting and invoicing operations. Built with modular architecture, Tailwind CSS, and reactive forms.

### Core Features

- 📊 **Account Dashboard** - View balances and transactions
- 💰 **Charge Recording** - Record ride charges with validation
- 💳 **Payment Processing** - Handle payments with balance updates
- 📄 **Invoice Management** - Generate, preview, and download invoices
- 🔍 **Transaction History** - Filter and paginate transactions
- 🔎 **Account Search** - Autocomplete with keyboard navigation

---

## 🚀 Quick Start

### Run Development Server

```bash
npm start
# Navigate to http://localhost:4200
```

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

---

## 🏗️ Technology Stack

- **Angular**: 16.2.16
- **TypeScript**: 4.9.5
- **Tailwind CSS**: 3.4+
- **RxJS**: 7.8.2
- **date-fns**: Latest
- **ngx-toastr**: 16.2.0

---

## 📚 Documentation

- **[Specification](docs/spec.md)** - 25 FRs, 6 user stories
- **[Tasks](docs/tasks.md)** - 273 implementation tasks
- **[Plan](docs/plan.md)** - Architecture & technical decisions

---

## 🎯 Project Status

### ✅ **Phase 1: Setup - COMPLETE** (17/20 tasks)

- ✅ Angular 16 project initialized with routing
- ✅ Tailwind CSS 3.4 configured with custom theme
- ✅ ESLint + Prettier + Husky + lint-staged configured
- ✅ Core dependencies installed (RxJS, date-fns, ngx-toastr)
- ⚠️ **Missing**: pnpm configuration, path aliases in tsconfig

### ✅ **Phase 2: Infrastructure - 80% COMPLETE** (13/20 tasks)

**Completed:**
- ✅ HTTP interceptors (error, loading)
- ✅ Core services (API, notification, loading)
- ✅ Custom form validators (5 validators)
- ✅ Shared components (button, input, modal, skeleton-loader)
- ✅ Unsaved changes guard
- ✅ App routing with feature modules

**Missing:**
- ❌ Auth interceptor
- ❌ FormErrorService
- ❌ Table component with sorting/pagination
- ❌ Currency & date format pipes
- ❌ AutoFocus directive

### 🚧 **Phase 3+: Features - PARTIALLY COMPLETE** (~15/200 tasks) 

**Implemented (Using Mock Data):**
- ✅ Account dashboard with transaction filtering & pagination
- ✅ Record charge form with validation
- ✅ Record payment form with validation
- ✅ Account search with autocomplete
- ✅ Invoice generation form
- ✅ Invoice listing page

**Critical Gaps:**
- ❌ **No unit tests** (0 tests written)
- ❌ **No E2E tests** (0 Playwright tests)
- ❌ **All services use mock data** (no real API integration)
- ❌ **No accessibility features** (ARIA, keyboard nav)
- ❌ **Missing advanced features** (real-time updates, offline support, exports)

### 📊 **Overall Progress: 45/266 tasks (17%)**

**Current Focus**: Completing missing infrastructure → API integration → Testing

**Next Priority**: 
1. Implement missing Phase 2 infrastructure (pipes, table, directives)
2. Replace mock services with real API calls
3. Add unit tests for components and services
4. Implement accessibility features

---

## 📞 Links

- **Backend API**: [RideLedger.Api](https://github.com/jainarula-tz/RideLedger.Api)
- **Issues**: [GitHub Issues](https://github.com/jainarula-tz/RideLedger.Web/issues)

---

**Built for ride service platforms** 🚗💰

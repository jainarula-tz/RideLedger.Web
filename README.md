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

### ✅ **Phase 2: Infrastructure - 100% COMPLETE** (20/20 tasks)

**Completed:**
- ✅ HTTP interceptors (auth, error, loading)
- ✅ Core services (API, notification, loading, FormErrorService)
- ✅ Custom form validators (5 validators)
- ✅ Shared components (button, input, modal, skeleton-loader, table)
- ✅ Pipes (currency-format, date-format)
- ✅ Directives (auto-focus)
- ✅ Unsaved changes guard
- ✅ App routing with feature modules

### ✅ **Phase 3: API Integration - COMPLETE** 

**Completed:**
- ✅ **All mock services replaced with real API calls**
- ✅ Account API (getAccount, getTransactions, searchAccounts, getBalance)
- ✅ Charges API (recordCharge)
- ✅ Payments API (recordPayment) 
- ✅ Invoices API (getInvoices, getInvoiceDetail, generateInvoice, downloadPdf)
- ✅ Ready for backend integration

### 🚧 **Phase 4+: Features - PARTIALLY COMPLETE** (~15/200 tasks) 

**Implemented (Now using Real APIs):**
- ✅ Account dashboard with transaction filtering & pagination
- ✅ Record charge form with validation
- ✅ Record payment form with validation
- ✅ Account search with autocomplete
- ✅ Invoice generation form
- ✅ Invoice listing page

**Critical Gaps:**
- ❌ **No unit tests** (0 tests written)
- ❌ **No E2E tests** (0 Playwright tests)
- ❌ **No accessibility features** (ARIA, keyboard nav)
- ❌ **Missing advanced features** (real-time updates, offline support, exports)

### 📊 **Overall Progress: 52/266 tasks (20%)**

**Latest Updates (Feb 9, 2026):**
- ✅ Phase 2 infrastructure 100% complete
- ✅ All services now use real API calls (no mocks)
- ✅ Ready for backend endpoints to be implemented

**Next Priority**: 
1. ✅ ~~Implement missing Phase 2 infrastructure~~ **DONE**
2. ✅ ~~Replace mock services with real API calls~~ **DONE**
3. **Add unit tests for components and services**
4. **Implement accessibility features (ARIA, keyboard navigation)**
5. **Add E2E tests with Playwright**

---

## 📞 Links

- **Backend API**: [RideLedger.Api](https://github.com/jainarula-tz/RideLedger.Api)
- **Issues**: [GitHub Issues](https://github.com/jainarula-tz/RideLedger.Web/issues)

---

**Built for ride service platforms** 🚗💰

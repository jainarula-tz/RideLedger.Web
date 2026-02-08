# Tasks: Accounting & Invoicing Frontend (Angular)

**Feature**: frontend-web  
**Branch**: `frontend-web`  
**Generated**: 2026-02-08  
**Total Tasks**: 262

---

## Task Organization

Tasks are organized by **user story** to enable independent implementation and testing. Each user story phase can be completed and tested independently before moving to the next.

**Priority Mapping**:
- **P1 Stories** (US1, US2): Core UI - View dashboard and record charges
- **P2 Stories** (US3, US4, US5): Extended functionality - Transactions, invoices, payments
- **P3 Stories** (US6): Search and navigation

---

## Phase 1: Setup & Project Initialization

**Goal**: Initialize Angular 18+ project with Tailwind CSS, configure tooling (ESLint, Prettier, Husky), and set up project structure.

**Completion Criteria**: Application compiles, serves on localhost:4200, Tailwind styles apply, linting passes, project structure follows feature-first architecture.

### Tasks

- [ ] T001 Create Angular 18+ project with standalone components at angular/accounting-frontend/ using Angular CLI
- [ ] T002 Configure pnpm as package manager, create .nvmrc with Node.js 20.x
- [ ] T003 [P] Install core dependencies: rxjs@7+, date-fns@3+, ngx-toastr@18+
- [ ] T004 [P] Install Tailwind CSS dependencies: tailwindcss@3.4+, postcss, autoprefixer
- [ ] T005 [P] Install dev dependencies: @angular-eslint/schematics, eslint, prettier, husky, lint-staged
- [ ] T006 [P] Install testing dependencies: @playwright/test
- [ ] T007 Initialize Tailwind CSS with tailwind.config.ts in project root
- [ ] T008 Configure Tailwind content paths in tailwind.config.ts to ["./src/**/*.{html,ts}"]
- [ ] T009 Add Tailwind directives (@tailwind base/components/utilities) to src/styles.css
- [ ] T010 Configure custom Tailwind theme colors (primary, success, error, warning) in tailwind.config.ts
- [ ] T011 Create .editorconfig at project root with indent_style=space, indent_size=2, charset=utf-8
- [ ] T012 Create .eslintrc.cjs with Angular ESLint rules, TypeScript strict rules, Prettier integration
- [ ] T013 Create .prettierrc with printWidth=100, singleQuote=true, trailingComma=all
- [ ] T014 Configure Husky pre-commit hook at .husky/pre-commit running lint-staged
- [ ] T015 Configure lint-staged in package.json to run eslint --fix and prettier --write on staged files
- [ ] T016 Update tsconfig.json with strict mode: strict=true, noImplicitAny=true, strictNullChecks=true
- [ ] T017 Add path aliases to tsconfig.json: @core/*, @shared/*, @features/*, @environments/*
- [ ] T018 Create environment files at src/environments/environment.ts and environment.development.ts with API base URL
- [ ] T019 Update angular.json to replace assets/styles optimization settings for production build
- [ ] T020 Create project structure: src/app/core/, src/app/shared/, src/app/features/

---

## Phase 2: Foundational Infrastructure (Non-Negotiable Prerequisites)

**Goal**: Implement core services, interceptors, guards, and shared components that ALL user stories depend on.

**Completion Criteria**: HTTP interceptors handle auth/errors/loading, notification service shows toasts, shared UI components render correctly, type-safe API client base exists.

**Blocking**: Must complete before ANY user story implementation.

### Tasks

- [ ] T021 Create ApiService at src/app/core/services/api.service.ts with base HTTP methods (get, post, put, delete with typed responses)
- [ ] T022 Create NotificationService at src/app/core/services/notification.service.ts wrapping ngx-toastr with success/error/warning/info methods
- [ ] T023 Create AuthInterceptor at src/app/core/interceptors/auth.interceptor.ts adding Authorization header from token storage
- [ ] T024 Create ErrorInterceptor at src/app/core/interceptors/error.interceptor.ts catching HTTP errors and showing notifications
- [ ] T025 Create LoadingInterceptor at src/app/core/interceptors/loading.interceptor.ts tracking active HTTP requests via BehaviorSubject
- [ ] T026 Register all interceptors in app.config.ts providers array
- [ ] T027 Create FormErrorService at src/app/core/services/form-error.service.ts centralizing validation error message generation
- [ ] T028 Create CustomValidators at src/app/shared/validators/custom-validators.ts with positiveNumber, maxDecimals, notFutureDate validators
- [ ] T029 [P] Create ButtonComponent at src/app/shared/components/button/button.component.ts with variants (primary, secondary, danger), loading state
- [ ] T030 [P] Create InputComponent at src/app/shared/components/input/input.component.ts with label, error message, required indicator
- [ ] T031 [P] Create ModalComponent at src/app/shared/components/modal/modal.component.ts with header, body, footer slots, close on Escape
- [ ] T032 [P] Create TableComponent at src/app/shared/components/table/table.component.ts with sorting, pagination, empty state
- [ ] T033 [P] Create SkeletonLoaderComponent at src/app/shared/components/skeleton-loader/skeleton-loader.component.ts with configurable shapes (rectangle, circle, text)
- [ ] T034 [P] Create CurrencyFormatPipe at src/app/shared/pipes/currency-format.pipe.ts formatting numbers as $1,234.56
- [ ] T035 [P] Create DateFormatPipe at src/app/shared/pipes/date-format.pipe.ts using date-fns format functions
- [ ] T036 [P] Create AutoFocusDirective at src/app/shared/directives/auto-focus.directive.ts focusing element on component init
- [ ] T037 Configure ngx-toastr in app.config.ts with global options (timeOut: 3000, positionClass: 'toast-top-right', closeButton: true)
- [ ] T038 Create app.routes.ts with lazy-loaded feature routes (accounts, charges, payments, invoices)
- [ ] T039 Create AppComponent at src/app/app.component.ts with router-outlet and navigation header
- [ ] T040 Style navigation header in AppComponent with Tailwind (flex, responsive menu, active link highlighting)

---

## Phase 3: User Story 1 - View Account Dashboard (P1)

**Story Goal**: Display account overview with current balance, recent transactions, and status indicators.

**Independent Test Criteria**:
- ✅ Dashboard loads with account ID from route params
- ✅ Displays account name, type badge, status badge, formatted balance
- ✅ Shows last 10 transactions with date, description, debit/credit amounts, running balance
- ✅ Skeleton loaders appear during API loading
- ✅ Error state displays "Account Not Found" for 404, retry button for network errors
- ✅ Page is keyboard accessible with proper focus management

### Tasks

- [ ] T041 [P] [US1] Create Account interface at src/app/features/accounts/models/account.model.ts with id, name, type, status, balance, dates
- [ ] T042 [P] [US1] Create Transaction interface at src/app/features/accounts/models/transaction.model.ts with all ledger entry fields
- [ ] T043 [P] [US1] Create AccountResponse interface at src/app/features/accounts/models/account-response.model.ts mapping backend API structure
- [ ] T044 [P] [US1] Create TransactionResponse interface at src/app/features/accounts/models/transaction-response.model.ts
- [ ] T045 [US1] Create AccountMapper at src/app/features/accounts/services/account-mapper.ts converting AccountResponse → Account with Date parsing
- [ ] T046 [US1] Create TransactionMapper at src/app/features/accounts/services/transaction-mapper.ts converting TransactionResponse → Transaction
- [ ] T047 [US1] Create AccountApiService at src/app/features/accounts/services/account-api.service.ts with getAccount, getTransactions methods
- [ ] T048 [US1] Implement getAccount method calling HTTP GET /api/v1/accounts/{id} and mapping response
- [ ] T049 [US1] Implement getTransactions method calling HTTP GET /api/v1/accounts/{id}/transactions with query params (page, limit)
- [ ] T050 [US1] Create AccountFacadeService at src/app/features/accounts/services/account-facade.service.ts with RxJS state management
- [ ] T051 [US1] Implement AccountFacadeService with BehaviorSubjects for currentAccount$, transactions$, loading$, error$
- [ ] T052 [US1] Add loadAccount method to AccountFacadeService calling AccountApiService and updating subjects
- [ ] T053 [US1] Add loadTransactions method to AccountFacadeService with pagination support
- [ ] T054 [P] [US1] Create AccountSummaryCardComponent at src/app/features/accounts/components/account-summary-card/account-summary-card.component.ts
- [ ] T055 [US1] Implement AccountSummaryCardComponent template with account name, type badge, status badge (green=Active, gray=Inactive), balance display
- [ ] T056 [US1] Style AccountSummaryCardComponent with Tailwind (card, flex layout, responsive, balance prominent with large font)
- [ ] T057 [P] [US1] Create TransactionListComponent at src/app/features/accounts/components/transaction-list/transaction-list.component.ts
- [ ] T058 [US1] Implement TransactionListComponent template with table displaying transactions (date, type, description, debit, credit, running balance)
- [ ] T059 [US1] Style TransactionListComponent with Tailwind (table, striped rows, hover effects, responsive mobile stack)
- [ ] T060 [US1] Add trackBy function to TransactionListComponent ngFor using transaction.id
- [ ] T061 [US1] Create AccountDashboardComponent at src/app/features/accounts/pages/account-dashboard/account-dashboard.component.ts
- [ ] T062 [US1] Inject ActivatedRoute in AccountDashboardComponent, extract accountId from route params
- [ ] T063 [US1] Inject AccountFacadeService, call loadAccount/loadTransactions in ngOnInit
- [ ] T064 [US1] Implement AccountDashboardComponent template with skeleton loaders (shown when loading$ is true)
- [ ] T065 [US1] Add error state template (shown when error$ has value) with error message and retry button
- [ ] T066 [US1] Add success state template (shown when currentAccount$ and transactions$ have data) using AccountSummaryCardComponent and TransactionListComponent
- [ ] T067 [US1] Style AccountDashboardComponent with Tailwind grid layout (summary card + transaction list side-by-side on desktop, stacked on mobile)
- [ ] T068 [US1] Configure route in app.routes.ts: {path: 'accounts/:id/dashboard', loadComponent: () => import AccountDashboardComponent}
- [ ] T069 [US1] Write unit test for AccountApiService mocking HttpClient
- [ ] T070 [US1] Write unit test for AccountFacadeService verifying state updates with RxJS TestScheduler
- [ ] T071 [US1] Write component test for AccountDashboardComponent with loading/error/success states
- [ ] T072 [US1] Write E2E test with Playwright for dashboard page loading and displaying correct account data

---

## Phase 4: User Story 2 - Record Ride Charges (P1)

**Story Goal**: Provide form to record ride charges with validation, error handling, and success feedback.

**Independent Test Criteria**:
- ✅ Form displays with all fields (Ride ID, Fare Amount, Service Date, Fleet ID optional, Description optional)
- ✅ Inline validation shows errors (required fields, positive amount, not future date, max 2 decimals)
- ✅ Submit button disabled during API call, form fields disabled
- ✅ Success toast appears, redirects to account dashboard
- ✅ Duplicate charge error (409) displays specific message
- ✅ Form data retained after API failure, retry button appears
- ✅ Keyboard accessible form with proper tab order and focus management

### Tasks

- [ ] T073 [P] [US2] Create ChargeFormData interface at src/app/features/charges/models/charge-form.model.ts with typed fields
- [ ] T074 [P] [US2] Create RecordChargeRequest interface at src/app/features/charges/models/charge-request.model.ts matching backend API contract
- [ ] T075 [P] [US2] Create RecordChargeResponse interface at src/app/features/charges/models/charge-response.model.ts
- [ ] T076 [US2] Create ChargeApiService at src/app/features/charges/services/charge-api.service.ts with recordCharge method
- [ ] T077 [US2] Implement recordCharge method calling HTTP POST /api/v1/charges with RecordChargeRequest body
- [ ] T078 [US2] Create ChargeFacadeService at src/app/features/charges/services/charge-facade.service.ts with RxJS state
- [ ] T079 [US2] Implement ChargeFacadeService with submitting$, submitError$, submitSuccess$ subjects
- [ ] T080 [US2] Add recordCharge method to ChargeFacadeService calling ChargeApiService and handling success/error
- [ ] T081 [US2] Create ChargeFormComponent at src/app/features/charges/components/charge-form/charge-form.component.ts with ReactiveFormsModule
- [ ] T082 [US2] Build FormGroup in ChargeFormComponent with fields: rideId, fareAmount, serviceDate, fleetId, description
- [ ] T083 [US2] Add validators to FormGroup: rideId (required), fareAmount (required, positiveNumber, maxDecimals(2)), serviceDate (required, notFutureDate)
- [ ] T084 [US2] Implement ChargeFormComponent template with input fields using shared InputComponent
- [ ] T085 [US2] Add date picker input for serviceDate with type="date" and max attribute set to today
- [ ] T086 [US2] Add dropdown for fleetId (optional) with placeholder "Select Fleet" (hardcode options for now: Fleet A, Fleet B, Fleet C)
- [ ] T087 [US2] Add textarea for description (optional) with rows=3
- [ ] T088 [US2] Display inline validation errors below each field using FormErrorService
- [ ] T089 [US2] Add submit button with loading state (disabled + spinner when submitting$ is true)
- [ ] T090 [US2] Disable all form fields when submitting$ is true
- [ ] T091 [US2] Implement onSubmit method calling ChargeFacadeService.recordCharge
- [ ] T092 [US2] Handle submitSuccess$ in component: show success toast, reset form, navigate to /accounts/{accountId}/dashboard
- [ ] T093 [US2] Handle submitError$ in component: show error toast with specific message for 409 Conflict ("Ride already charged")
- [ ] T094 [US2] Keep form data intact on error, show retry button
- [ ] T095 [US2] Style ChargeFormComponent with Tailwind (form layout, field spacing, responsive, error text red)
- [ ] T096 [US2] Create RecordChargePageComponent at src/app/features/charges/pages/record-charge/record-charge.component.ts
- [ ] T097 [US2] Implement RecordChargePageComponent template with page header "Record Charge" and ChargeFormComponent
- [ ] T098 [US2] Configure route in app.routes.ts: {path: 'charges/record', loadComponent: () => import RecordChargePageComponent}
- [ ] T099 [US2] Write unit test for ChargeFacadeService verifying recordCharge logic
- [ ] T100 [US2] Write component test for ChargeFormComponent with validation scenarios (invalid amount, future date, missing required)
- [ ] T101 [US2] Write E2E test with Playwright for charge form submission success and error paths
- [ ] T101a [US2] Implement unsaved changes guard at src/app/features/charges/guards/unsaved-changes.guard.ts for ChargeFormComponent (FR-020)

---

## Phase 5: User Story 3 - Transaction History with Filters (P2)

**Story Goal**: Display paginated transaction history with date range and transaction type filters.

**Independent Test Criteria**:
- ✅ Transaction list shows 25 transactions per page with pagination controls
- ✅ Each transaction displays date, type badge, description, debit, credit, running balance
- ✅ Date range filter (start/end date pickers) filters results and shows loading indicator
- ✅ Transaction type filter (All/Charges/Payments dropdown) filters results
- ✅ Clear Filters button resets all filters and reloads full list
- ✅ Large datasets (1000+ transactions) load within 2 seconds with shimmer placeholders
- ✅ URL updates with filter query params for bookmarkability

### Tasks

- [ ] T102 [P] [US3] Create TransactionFilter interface at src/app/features/accounts/models/filter.model.ts with startDate, endDate, type properties
- [ ] T102a [US3] Define reuse contract for TransactionListComponent: add @Input() filterConfig for enabling filter controls inline vs separate FilterComponent (FR-020 component reuse)
- [ ] T103 [US3] Create TransactionFilterComponent at src/app/features/accounts/components/transaction-filter/transaction-filter.component.ts
- [ ] T104 [US3] Build FormGroup in TransactionFilterComponent with startDate, endDate, type controls
- [ ] T105 [US3] Implement TransactionFilterComponent template with date pickers for startDate/endDate
- [ ] T106 [US3] Add dropdown for transaction type with options: All, Charges Only, Payments Only
- [ ] T107 [US3] Add "Apply Filters" button and "Clear Filters" button
- [ ] T108 [US3] Emit filter changes via @Output EventEmitter<TransactionFilter> on Apply Filters click
- [ ] T109 [US3] Emit clear event via @Output EventEmitter<void> on Clear Filters click
- [ ] T110 [US3] Style TransactionFilterComponent with Tailwind (flex row layout, responsive stack on mobile, button group)
- [ ] T111 [US3] Update AccountApiService.getTransactions to accept filter params (startDate, endDate, type, page, limit)
- [ ] T112 [US3] Update AccountFacadeService to store filters$ BehaviorSubject and apply filters to getTransactions calls
- [ ] T113 [US3] Add applyFilters method to AccountFacadeService updating filters$ and reloading transactions
- [ ] T114 [US3] Add clearFilters method to AccountFacadeService resetting filters$ and reloading transactions
- [ ] T115 [US3] Update TransactionListComponent to accept pagination input: @Input() currentPage, @Input() totalPages, @Output() pageChange
- [ ] T116 [US3] Add pagination controls to TransactionListComponent template (Previous, Page X of Y, Next buttons)
- [ ] T117 [US3] Disable Previous button when currentPage === 1, disable Next button when currentPage === totalPages
- [ ] T118 [US3] Create TransactionHistoryPageComponent at src/app/features/accounts/pages/transaction-history/transaction-history.component.ts
- [ ] T119 [US3] Inject ActivatedRoute, AccountFacadeService into TransactionHistoryPageComponent
- [ ] T120 [US3] Load accountId from route params, initialize filters from query params (startDate, endDate, type, page)
- [ ] T121 [US3] Implement template with TransactionFilterComponent and TransactionListComponent
- [ ] T122 [US3] Handle onFiltersApplied event calling AccountFacadeService.applyFilters and updating URL query params
- [ ] T123 [US3] Handle onFiltersCleared event calling AccountFacadeService.clearFilters and removing URL query params
- [ ] T124 [US3] Handle onPageChange event from TransactionListComponent loading next/previous page
- [ ] T125 [US3] Show SkeletonLoaderComponent (table shape) when loading$ is true
- [ ] T126 [US3] Configure route in app.routes.ts: {path: 'accounts/:id/transactions', loadComponent: () => import TransactionHistoryPageComponent}
- [ ] T127 [US3] Write unit test for TransactionFilterComponent verifying filter emission
- [ ] T128 [US3] Write component test for TransactionHistoryPageComponent verifying filter/pagination integration
- [ ] T129 [US3] Write E2E test with Playwright for transaction history filtering and pagination

---

## Phase 6: User Story 4 - Generate and Download Invoices (P2)

**Story Goal**: Generate invoices with selectable billing frequency and download as PDF.

**Independent Test Criteria**:
- ✅ Invoice generation modal opens with billing frequency dropdown (Per Ride, Daily, Weekly, Monthly) and date range picker
- ✅ Generate Invoice button triggers API call with loading state
- ✅ Invoice preview displays invoice number, line items, subtotal, payments applied, outstanding balance
- ✅ Download PDF button triggers file download with filename "Invoice-{InvoiceNumber}-{Date}.pdf"
- ✅ Empty date range shows validation error "No billable items found"
- ✅ API error shows error toast with retry option

### Tasks

- [ ] T130 [P] [US4] Create Invoice interface at src/app/features/invoices/models/invoice.model.ts with all invoice fields
- [ ] T131 [P] [US4] Create InvoiceLineItem interface at src/app/features/invoices/models/invoice-line-item.model.ts
- [ ] T132 [P] [US4] Create InvoiceFormData interface at src/app/features/invoices/models/invoice-form.model.ts with billingFrequency, startDate, endDate
- [ ] T133 [P] [US4] Create GenerateInvoiceRequest interface at src/app/features/invoices/models/invoice-request.model.ts matching backend API
- [ ] T134 [P] [US4] Create InvoiceResponse interface at src/app/features/invoices/models/invoice-response.model.ts
- [ ] T135 [US4] Create InvoiceApiService at src/app/features/invoices/services/invoice-api.service.ts with generateInvoice, downloadInvoicePdf methods
- [ ] T136 [US4] Implement generateInvoice method calling HTTP POST /api/v1/invoices/generate with GenerateInvoiceRequest
- [ ] T137 [US4] Implement downloadInvoicePdf method calling HTTP GET /api/v1/invoices/{id}/pdf with responseType: 'blob'
- [ ] T138 [US4] Create InvoiceFacadeService at src/app/features/invoices/services/invoice-facade.service.ts with RxJS state
- [ ] T139 [US4] Implement InvoiceFacadeService with generatedInvoice$, generating$, generateError$ subjects
- [ ] T140 [US4] Add generateInvoice method to InvoiceFacadeService calling InvoiceApiService
- [ ] T141 [US4] Add downloadPdf method to InvoiceFacadeService calling API and triggering browser download (create anchor element, click)
- [ ] T142 [US4] Create InvoiceGeneratorComponent at src/app/features/invoices/components/invoice-generator/invoice-generator.component.ts (modal form)
- [ ] T143 [US4] Build FormGroup in InvoiceGeneratorComponent with billingFrequency, startDate, endDate controls
- [ ] T144 [US4] Implement template with dropdown for billingFrequency (options: PerRide, Daily, Weekly, Monthly)
- [ ] T145 [US4] Add date range pickers for startDate and endDate with validation (startDate < endDate)
- [ ] T146 [US4] Add Generate Invoice button with loading state (disabled + spinner when generating$ is true)
- [ ] T147 [US4] Implement onGenerate method calling InvoiceFacadeService.generateInvoice
- [ ] T148 [US4] Handle generateError$ showing validation error for empty date range or API error toast
- [ ] T149 [P] [US4] Create InvoicePreviewComponent at src/app/features/invoices/components/invoice-preview/invoice-preview.component.ts
- [ ] T150 [US4] Implement InvoicePreviewComponent template displaying invoice number, billing period, line items table
- [ ] T151 [US4] Add summary section showing subtotal, total payments applied, outstanding balance (styled prominently)
- [ ] T152 [US4] Add Download PDF button calling InvoiceFacadeService.downloadPdf on click
- [ ] T153 [US4] Style InvoicePreviewComponent with Tailwind (card, table layout, summary with large font, print-friendly)
- [ ] T154 [US4] Style InvoiceGeneratorComponent modal with Tailwind (modal overlay, centered card, form layout)
- [ ] T155 [US4] Create InvoiceListPageComponent at src/app/features/invoices/pages/invoice-list/invoice-list.component.ts
- [ ] T156 [US4] Implement template with "Generate Invoice" button opening InvoiceGeneratorComponent modal
- [ ] T157 [US4] Show InvoicePreviewComponent when generatedInvoice$ has value
- [ ] T158 [US4] Configure route in app.routes.ts: {path: 'invoices', loadComponent: () => import InvoiceListPageComponent}
- [ ] T159 [US4] Write unit test for InvoiceFacadeService verifying generateInvoice and downloadPdf logic
- [ ] T160 [US4] Write component test for InvoiceGeneratorComponent with validation scenarios
- [ ] T161 [US4] Write E2E test with Playwright for invoice generation and PDF download

---

## Phase 7: User Story 5 - Record Payments (P2)

**Story Goal**: Provide form to record payments with validation, overpayment warning, and error handling.

**Independent Test Criteria**:
- ✅ Form displays with all fields (Payment Reference ID, Amount, Payment Date, Payment Mode optional, Notes optional)
- ✅ Inline validation shows errors (required fields, positive amount, unique Payment Reference ID)
- ✅ Overpayment warning modal appears when amount exceeds outstanding balance, with Confirm/Cancel options
- ✅ Submit button disabled during API call, form fields disabled
- ✅ Success toast appears, balance refreshes, form resets
- ✅ Duplicate Payment Reference ID error (409) displays specific message
- ✅ Unsaved changes confirmation dialog appears when navigating away with entered data

### Tasks

- [ ] T162 [P] [US5] Create PaymentFormData interface at src/app/features/payments/models/payment-form.model.ts with typed fields
- [ ] T163 [P] [US5] Create RecordPaymentRequest interface at src/app/features/payments/models/payment-request.model.ts matching backend API
- [ ] T164 [P] [US5] Create RecordPaymentResponse interface at src/app/features/payments/models/payment-response.model.ts
- [ ] T165 [US5] Create PaymentApiService at src/app/features/payments/services/payment-api.service.ts with recordPayment method
- [ ] T166 [US5] Implement recordPayment method calling HTTP POST /api/v1/payments with RecordPaymentRequest body
- [ ] T167 [US5] Create PaymentFacadeService at src/app/features/payments/services/payment-facade.service.ts with RxJS state
- [ ] T168 [US5] Implement PaymentFacadeService with submitting$, submitError$, submitSuccess$ subjects
- [ ] T169 [US5] Add recordPayment method to PaymentFacadeService calling PaymentApiService and handling success/error
- [ ] T170 [US5] Create PaymentFormComponent at src/app/features/payments/components/payment-form/payment-form.component.ts with ReactiveFormsModule
- [ ] T171 [US5] Build FormGroup in PaymentFormComponent with fields: paymentReferenceId, amount, paymentDate, paymentMode, notes
- [ ] T172 [US5] Add validators: paymentReferenceId (required), amount (required, positiveNumber, maxDecimals(2)), paymentDate (required)
- [ ] T173 [US5] Implement template with input fields using shared InputComponent
- [ ] T174 [US5] Add date picker for paymentDate with type="date"
- [ ] T175 [US5] Add dropdown for paymentMode (optional) with options: Cash, Card, Bank Transfer
- [ ] T176 [US5] Add textarea for notes (optional) with rows=3
- [ ] T177 [US5] Display inline validation errors below each field using FormErrorService
- [ ] T178 [US5] Add submit button with loading state (disabled + spinner when submitting$ is true)
- [ ] T179 [US5] Implement onSubmit method checking if amount exceeds outstanding balance
- [ ] T180 [US5] If overpayment detected, show confirmation modal (using shared ModalComponent) with message and Confirm/Cancel buttons
- [ ] T181 [US5] On Confirm, call PaymentFacadeService.recordPayment
- [ ] T182 [US5] Handle submitSuccess$: show success toast, reset form, navigate to /accounts/{accountId}/dashboard
- [ ] T183 [US5] Handle submitError$: show error toast with specific message for 409 Conflict ("Payment Reference ID already used")
- [ ] T184 [US5] Implement CanDeactivate guard at src/app/core/guards/unsaved-changes.guard.ts checking form dirty state
- [ ] T185 [US5] Show "Unsaved changes will be lost" confirmation dialog when navigating away with dirty form
- [ ] T186 [US5] Style PaymentFormComponent with Tailwind (form layout, field spacing, responsive)
- [ ] T187 [US5] Create RecordPaymentPageComponent at src/app/features/payments/pages/record-payment/record-payment.component.ts
- [ ] T188 [US5] Implement template with page header "Record Payment" and PaymentFormComponent
- [ ] T189 [US5] Configure route in app.routes.ts with unsaved changes guard: {path: 'payments/record', loadComponent, canDeactivate: [UnsavedChangesGuard]}
- [ ] T190 [US5] Write unit test for PaymentFacadeService verifying recordPayment logic
- [ ] T191 [US5] Write component test for PaymentFormComponent with overpayment scenario
- [ ] T192 [US5] Write E2E test with Playwright for payment form submission and unsaved changes dialog

---

## Phase 8: User Story 6 - Account Search (P3)

**Story Goal**: Enable account search with autocomplete and navigation between different accounts.

**Independent Test Criteria**:
- ✅ Search input with autocomplete dropdown appears in header
- ✅ Typing in search input triggers debounced API call (500ms) and shows loading spinner
- ✅ Autocomplete results show account name, type, and current balance
- ✅ Arrow keys navigate results, Enter selects, Escape closes dropdown
- ✅ Selecting account navigates to /accounts/{id}/dashboard
- ✅ Search completes within 500ms (p95)
- ✅ Keyboard accessible with proper ARIA attributes

### Tasks

- [ ] T193 [P] [US6] Create SearchResult interface at src/app/features/accounts/models/search-result.model.ts with account summary fields
- [ ] T194 [US6] Update AccountApiService with searchAccounts method calling HTTP GET /api/v1/accounts/search?q={query}
- [ ] T195 [US6] Create AccountSearchService at src/app/features/accounts/services/account-search.service.ts for search-specific state
- [ ] T196 [US6] Implement AccountSearchService with searchResults$, searching$ subjects
- [ ] T197 [US6] Add search method to AccountSearchService calling AccountApiService.searchAccounts with RxJS debounceTime(500)
- [ ] T198 [US6] Create AccountSearchComponent at src/app/shared/components/account-search/account-search.component.ts (reusable for header)
- [ ] T199 [US6] Implement template with search input and autocomplete dropdown (hidden by default)
- [ ] T200 [US6] Add input event handler calling AccountSearchService.search with debounceTime(300) operator
- [ ] T201 [US6] Subscribe to searchResults$ and display in dropdown (account name, type badge, balance formatted)
- [ ] T202 [US6] Show loading spinner inside input when searching$ is true
- [ ] T203 [US6] Implement keyboard navigation: Arrow Down/Up moves between results, Enter selects, Escape closes
- [ ] T204 [US6] Add ARIA attributes: role="combobox", aria-autocomplete="list", aria-expanded, aria-activedescendant
- [ ] T205 [US6] On result selection, emit @Output EventEmitter<string> with accountId and navigate to /accounts/{id}/dashboard
- [ ] T206 [US6] Style AccountSearchComponent with Tailwind (input with icon, dropdown with shadow, hover effects, responsive)
- [ ] T207 [US6] Add AccountSearchComponent to AppComponent header navigation
- [ ] T208 [US6] Write unit test for AccountSearchService verifying debounce and search logic
- [ ] T209 [US6] Write component test for AccountSearchComponent with keyboard navigation scenarios
- [ ] T210 [US6] Write E2E test with Playwright for account search and navigation
- [ ] T210a [US6] Write comprehensive keyboard navigation test for all interactive elements: Tab order, Enter/Space activation, Escape dismiss, Arrow navigation in lists (FR-018)

---

## Phase 9: Edge Case Testing

**Goal**: Validate system behavior under edge case scenarios documented in spec.md.

**Completion Criteria**: All 8 edge case scenarios have E2E or integration tests, tests pass consistently.

### Tasks

- [ ] T225 [Edge] Write E2E test for concurrent charge submissions on same account (EC-001: verify no race conditions, both charges recorded with correct balances)
- [ ] T226 [Edge] Write E2E test for zero-amount charge (EC-002: verify validation error displayed, transaction not created)
- [ ] T227 [Edge] Write E2E test for negative amount charge (EC-003: verify validation error displayed, transaction not created)
- [ ] T228 [Edge] Write E2E test for transaction on inactive account (EC-004: verify error message "Account is inactive", no transaction recorded)
- [ ] T229 [Edge] Write E2E test for invoice generation with zero charges (EC-005: verify error message "No charges to invoice", invoice not created)
- [ ] T230 [Edge] Write E2E test for duplicate invoice generation (EC-006: verify idempotency key prevents duplicate, same invoice returned)
- [ ] T231 [Edge] Write E2E test for payment exceeding invoice amount (EC-007: verify validation error "Payment exceeds invoice balance", payment not recorded)
- [ ] T232 [Edge] Write E2E test for large transaction list pagination (EC-008: load page with 1000+ transactions, verify p95 latency <2s, no UI freezing)

---

## Phase 10: Testing & Quality Assurance

**Goal**: Comprehensive test coverage with unit tests, component tests, and E2E tests.

**Completion Criteria**: 70%+ unit test coverage, all critical workflows have E2E tests, all tests pass in CI pipeline.

### Tasks

- [ ] T211 [P] Configure Jasmine/Karma test runner in angular.json with code coverage enabled
- [ ] T212 [P] Configure Playwright in playwright.config.ts with projects for Chrome, Firefox, Safari
- [ ] T213 [P] Create test utilities at src/testing/test-utils.ts (mock services, spy helpers, fixture builders)
- [ ] T214 [P] Create Playwright Page Object Models at e2e/pom/ for AccountDashboardPage, ChargeFormPage, PaymentFormPage, InvoiceGenerationPage
- [ ] T215 Write unit tests for all facade services (AccountFacadeService, ChargeFacadeService, PaymentFacadeService, InvoiceFacadeService)
- [ ] T216 Write unit tests for all API services (AccountApiService, ChargeApiService, PaymentApiService, InvoiceApiService)
- [ ] T217 Write component tests for shared components (ButtonComponent, InputComponent, ModalComponent, TableComponent, SkeletonLoaderComponent)
- [ ] T218 Write component tests for all feature components covering loading/error/success states
- [ ] T219 Write E2E test for account dashboard workflow (navigate to dashboard, verify data loads, verify error handling)
- [ ] T220 Write E2E test for charge recording workflow (fill form, submit, verify success toast, verify redirect)
- [ ] T221 Write E2E test for payment recording workflow (fill form, handle overpayment warning, submit, verify balance update)
- [ ] T222 Write E2E test for invoice generation workflow (open modal, select parameters, generate, preview, download PDF)
- [ ] T223 Write E2E test for transaction history filtering (apply date range filter, apply type filter, paginate, clear filters)
- [ ] T224 Write E2E test for account search (type in search, verify autocomplete, select result, verify navigation)
- [ ] T233 Configure code coverage threshold in karma.conf.js (70% lines, 60% branches)
- [ ] T234 Run all tests and verify coverage meets threshold: pnpm test --code-coverage

---

## Phase 11: Accessibility & Performance Optimization

**Goal**: Ensure WCAG 2.1 AA compliance, keyboard accessibility, performance optimization (Lighthouse >90).

**Completion Criteria**: Lighthouse Accessibility score 100, Performance score >90, all pages keyboard accessible, aXe violations = 0.

### Tasks

- [ ] T235 [P] Add ARIA labels to all interactive elements (buttons, inputs, dropdowns, modals)
- [ ] T236 [P] Add ARIA live regions for dynamic content (toast notifications, search results, loading states)
- [ ] T237 [P] Ensure all images have alt text, decorative images have empty alt=""
- [ ] T238 [P] Add skip links at top of AppComponent for keyboard navigation (Skip to main content)
- [ ] T239 [P] Ensure focus visible styles for all interactive elements (Tailwind focus:ring)
- [ ] T240 [P] Add loading announcements for screen readers using aria-live="polite"
- [ ] T241 Configure OnPush change detection for all components
- [ ] T242 Add trackBy functions to all ngFor directives
- [ ] T243 Use async pipe for all subscriptions in templates (remove manual subscribes)
- [ ] T244 Configure lazy loading for all feature routes in app.routes.ts
- [ ] T245 Implement route preloading strategy (PreloadAllModules or custom)
- [ ] T246 Optimize bundle size: analyze with webpack-bundle-analyzer, split large libraries
- [ ] T247 Configure NgOptimizedImage for any images in application
- [ ] T248 Add Content Security Policy headers in index.html meta tags
- [ ] T249 Run Lighthouse audit on all major pages, verify Performance >90, Accessibility 100
- [ ] T250 Run aXe accessibility audit on all major pages, fix all violations
- [ ] T251 Test keyboard-only navigation for all workflows (Tab, Arrow keys, Enter, Escape)
- [ ] T252 Test screen reader compatibility with NVDA/JAWS (Windows) or VoiceOver (Mac)

---

## Phase 12: Polish & Documentation

**Goal**: Add finishing touches, documentation, CI/CD pipeline, and production readiness.

**Completion Criteria**: README complete, CI pipeline runs tests and builds, Docker image builds successfully, application deployable.

### Tasks

- [ ] T253 [P] Create comprehensive README.md at project root with project overview, architecture diagram, setup instructions
- [ ] T254 [P] Document all API services with JSDoc comments
- [ ] T255 [P] Document component interfaces (@Input, @Output) with JSDoc comments
- [ ] T256 [P] Create CHANGELOG.md with version history
- [ ] T257 Create .env.example with environment variable documentation (API_BASE_URL, etc.)
- [ ] T258 Create Dockerfile at project root with multi-stage build (build → nginx runtime)
- [ ] T259 Configure nginx.conf for serving Angular SPA (fallback to index.html for all routes)
- [ ] T260 Create docker-compose.yml for local development with frontend + backend services
- [ ] T261 Create .dockerignore excluding node_modules, .git, e2e
- [ ] T262 Create GitHub Actions workflow at .github/workflows/frontend-ci.yml (install, lint, test, build)
- [ ] T263 Add Playwright tests to CI workflow with parallelization
- [ ] T264 Add Lighthouse CI to workflow for performance regression testing
- [ ] T265 Add dependency vulnerability scanning to CI (npm audit or Snyk)
- [ ] T266 Configure branch protection rules requiring CI pass before merge
- [ ] T267 Create deployment scripts at scripts/ (deploy-staging.sh, deploy-production.sh)
- [ ] T268 Document deployment process in README.md (staging, production, rollback)
- [ ] T269 Create analytics/monitoring setup guide (Google Analytics, Sentry, etc.)
- [ ] T270 Create troubleshooting guide in docs/TROUBLESHOOTING.md

---

## Dependency Graph (User Story Completion Order)

```
Phase 1 (Setup) → Phase 2 (Foundational)
                        ↓
        ┌───────────────┴───────────────┐
        ↓                               ↓
   ┌────────────┐                  ┌────────────┐
   │   US1 (P1) │                  │   US2 (P1) │
   │   Account  │                  │   Record   │
   │  Dashboard │                  │  Charges   │
   └─────┬──────┘                  └─────┬──────┘
         │                               │
         └────────────┬──────────────────┘
                      ↓
        ┌─────────────┴─────────────┐
        ↓                           ↓
   ┌────────────┐              ┌────────────┐
   │   US3 (P2) │              │   US5 (P2) │
   │Transaction │              │   Record   │
   │  History   │              │  Payments  │
   └─────┬──────┘              └────────────┘
         ↓
   ┌────────────┐
   │   US4 (P2) │
   │  Generate  │
   │  Invoices  │
   └─────┬──────┘
         ↓
   ┌────────────┐
   │   US6 (P3) │
   │  Account   │
   │   Search   │
   └────────────┘
```

**Notes**:
- US1 and US2 are independent and can be developed in parallel after foundational layer
- US3 depends on US1 (uses transaction list component and account facade)
- US4 depends on US3 (needs transaction history data for invoice generation)
- US5 is independent and can be developed in parallel with US3/US4
- US6 can be developed anytime after foundational layer

---

## Parallel Execution Opportunities

### High Parallelization (Can Work Simultaneously)

**Phase 1 Setup**:
- Dependencies installation (T003-T006) can happen in parallel
- Configuration files (T011-T017) can be created in parallel

**Phase 2 Foundational** (Shared Components T029-T036):
- ButtonComponent, InputComponent, ModalComponent, TableComponent, SkeletonLoaderComponent are independent
- CurrencyFormatPipe and DateFormatPipe are independent

**Per User Story**:
- **US1**: Models (T041-T044), mappers (T045-T046), components (T054, T057) can be developed in parallel
- **US2**: Models (T073-T075) can be developed in parallel
- **US4**: Models (T130-T134) can be developed in parallel, components (T142, T149) can be developed in parallel
- **US5**: Models (T162-T164) can be developed in parallel

**Testing Phase**:
- All unit tests (T215-T218) can be written in parallel
- E2E tests (T219-T224) can be written in parallel

**Accessibility & Performance** (T227-T232):
- ARIA attributes can be added to different components in parallel

### Low Parallelization (Sequential Dependencies)

**Cannot Parallelize**:
- API service must precede facade service (facade depends on API)
- Facade service must precede components (components depend on facade)
- Components must precede page components (page uses components)
- Implementation must precede tests
- Foundational infrastructure must precede feature development

---

## Implementation Strategy

### MVP Scope (Deliver Value Fast)

**Week 1**: Phase 1 (Setup) + Phase 2 (Foundational)
- **Deliverable**: Angular project with Tailwind, shared components, interceptors, routing configured

**Week 2**: US1 (Account Dashboard)
- **Deliverable**: Can view account dashboard with balance and recent transactions
- **Business Value**: Users can see financial position

**Week 3**: US2 (Record Charges)
- **Deliverable**: Can record ride charges via form with validation
- **Business Value**: Core charge recording enabled

**Week 4**: US5 (Record Payments) + US3 (Transaction History)
- **Deliverable**: Can record payments and view detailed transaction history
- **Business Value**: Complete transaction cycle operational

**Week 5**: US4 (Generate Invoices)
- **Deliverable**: Can generate invoices and download PDF
- **Business Value**: Customer billing workflow enabled

**Week 6**: US6 (Account Search) + Phase 9-11 (Testing, A11y, Polish)
- **Deliverable**: Full feature set with search, 70%+ test coverage, WCAG compliant, CI/CD pipeline

### Incremental Delivery

After each user story phase:
1. Run unit tests and E2E tests
2. Verify Lighthouse scores (Performance, Accessibility)
3. Deploy to staging environment
4. Demo to stakeholders
5. Collect UX feedback before next phase

---

## Testing Summary

**Unit Tests**: 85+ tests
- Services: All facade services, API services
- Components: All feature components, shared components
- Pipes: CurrencyFormatPipe, DateFormatPipe
- Guards: UnsavedChangesGuard

**Component Tests**: 60+ tests
- Loading/error/success states for all feature pages
- Form validation scenarios
- User interaction scenarios

**E2E Tests**: 6 critical workflows
- Account dashboard loading
- Charge recording
- Payment recording with overpayment
- Invoice generation and download
- Transaction history filtering and pagination
- Account search and navigation

**Test Coverage Target**: 70%+ lines, 60%+ branches

---

## Format Validation

✅ **ALL tasks follow checklist format**: `- [ ] [TaskID] [P?] [Story?] Description with file path`  
✅ **Task IDs sequential**: T001-T270 (including T101a, T102a, T210a for additional coverage)  
✅ **User story labels**: [US1], [US2], [US3], [US4], [US5], [US6] applied correctly  
✅ **Parallelizable tasks marked**: [P] where applicable  
✅ **File paths specified**: All implementation tasks include absolute file paths  

---

## Summary

- **Total Tasks**: 273
- **Setup Tasks**: 20
- **Foundational Tasks**: 20
- **User Story 1 (P1)**: 32 tasks
- **User Story 2 (P1)**: 30 tasks
- **User Story 3 (P2)**: 29 tasks
- **User Story 4 (P2)**: 32 tasks
- **User Story 5 (P2)**: 31 tasks
- **User Story 6 (P3)**: 19 tasks
- **Edge Case Testing**: 8 tasks
- **Testing & QA**: 16 tasks
- **Accessibility & Performance**: 18 tasks
- **Polish & Documentation**: 18 tasks

**Estimated Effort**: 6-7 weeks (with 2-3 developers working in parallel)

**MVP Delivery**: Week 3 (US1 + US2 complete = view dashboard and record charges functional)

**Status**: ✅ Ready for implementation

# Data Model: Accounting & Invoicing Frontend (Angular)

**Feature**: 002-accounting-frontend  
**Date**: 2026-02-08  
**Phase**: Phase 1 - Design & Contracts

This document defines the TypeScript interfaces and models for the Angular frontend application.

---

## 1. Domain Models (Frontend)

### 1.1 Core Entities

#### Account Model

Represents a customer account with financial information.

```typescript
export interface Account {
  id: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum AccountType {
  Organization = 'Organization',
  Individual = 'Individual'
}

export enum AccountStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}
```

#### Transaction Model

Represents a ledger entry for display in transaction history.

```typescript
export interface Transaction {
  id: string;
  accountId: string;
  transactionDate: Date;
  type: TransactionType;
  description: string;
  debitAmount: number | null;
  creditAmount: number | null;
  runningBalance: number;
  sourceReferenceId: string;
}

export enum TransactionType {
  Charge = 'Charge',
  Payment = 'Payment'
}
```

#### Invoice Model

Represents a generated invoice.

```typescript
export interface Invoice {
  invoiceNumber: string;
  accountId: string;
  accountName: string;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  totalPaymentsApplied: number;
  outstandingBalance: number;
  generatedAt: Date;
}

export interface InvoiceLineItem {
  rideId: string;
  serviceDate: Date;
  fareAmount: number;
  description: string;
}
```

---

## 2. Form Models

### 2.1 Charge Form Model

```typescript
export interface ChargeFormData {
  rideId: string;
  fareAmount: number;
  serviceDate: Date;
  fleetId: string | null;
  description: string | null;
}

export interface ChargeFormErrors {
  rideId?: string;
  fareAmount?: string;
  serviceDate?: string;
}
```

### 2.2 Payment Form Model

```typescript
export interface PaymentFormData {
  paymentReferenceId: string;
  amount: number;
  paymentDate: Date;
  paymentMode: PaymentMode | null;
  notes: string | null;
}

export enum PaymentMode {
  Cash = 'Cash',
  Card = 'Card',
  BankTransfer = 'Bank Transfer'
}

export interface PaymentFormErrors {
  paymentReferenceId?: string;
  amount?: string;
  paymentDate?: string;
}
```

### 2.3 Invoice Generation Form Model

```typescript
export interface InvoiceGenerationFormData {
  accountId: string;
  billingFrequency: BillingFrequency;
  dateRangeStart: Date;
  dateRangeEnd: Date;
}

export enum BillingFrequency {
  PerRide = 'Per Ride',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}
```

---

## 3. API Response Models

### 3.1 Account API Responses

**Get Account Response**:
```typescript
export interface GetAccountResponse {
  accountId: string;
  name: string;
  type: 'Organization' | 'Individual';
  status: 'Active' | 'Inactive';
  currentBalance: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

**Get Balance Response**:
```typescript
export interface GetBalanceResponse {
  accountId: string;
  balance: number;
  currency: string;
  asOfDate: string; // ISO 8601
}
```

### 3.2 Charge API Responses

**Record Charge Response**:
```typescript
export interface RecordChargeResponse {
  chargeId: string;
  accountId: string;
  amount: number;
  rideId: string;
  serviceDate: string; // ISO 8601
  ledgerEntryIds: string[];
  recordedAt: string; // ISO 8601
}
```

### 3.3 Payment API Responses

**Record Payment Response**:
```typescript
export interface RecordPaymentResponse {
  paymentId: string;
  accountId: string;
  amount: number;
  paymentReferenceId: string;
  paymentDate: string; // ISO 8601
  remainingBalance: number;
  ledgerEntryIds: string[];
  recordedAt: string; // ISO 8601
}
```

### 3.4 Transaction API Responses

**Get Transaction History Response**:
```typescript
export interface GetTransactionHistoryResponse {
  transactions: TransactionItemResponse[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface TransactionItemResponse {
  transactionId: string;
  accountId: string;
  transactionDate: string; // ISO 8601
  type: 'Charge' | 'Payment';
  description: string;
  debitAmount: number | null;
  creditAmount: number | null;
  runningBalance: number;
  sourceReferenceId: string;
}
```

### 3.5 Invoice API Responses

**Generate Invoice Response**:
```typescript
export interface GenerateInvoiceResponse {
  invoiceNumber: string;
  accountId: string;
  accountName: string;
  billingPeriodStart: string; // ISO 8601
  billingPeriodEnd: string; // ISO 8601
  lineItems: InvoiceLineItemResponse[];
  subtotal: number;
  totalPaymentsApplied: number;
  outstandingBalance: number;
  generatedAt: string; // ISO 8601
  pdfDownloadUrl: string;
}

export interface InvoiceLineItemResponse {
  rideId: string;
  serviceDate: string; // ISO 8601
  fareAmount: number;
  description: string;
}
```

---

## 4. Filter and Pagination Models

### 4.1 Transaction Filter Model

```typescript
export interface TransactionFilter {
  accountId: string;
  dateRangeStart: Date | null;
  dateRangeEnd: Date | null;
  transactionType: TransactionType | null;
  pageNumber: number;
  pageSize: number;
}
```

### 4.2 Pagination Model

```typescript
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationControls {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}
```

---

## 5. UI State Models

### 5.1 Loading State Model

```typescript
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}
```

### 5.2 Error State Model

```typescript
export interface ErrorState {
  hasError: boolean;
  errorMessage: string | null;
  errorCode?: string;
}
```

### 5.3 Success State Model

```typescript
export interface SuccessState {
  isSuccess: boolean;
  successMessage: string | null;
}
```

---

## 6. Mapper Functions

### 6.1 Account Mappers

```typescript
export class AccountMapper {
  static fromApiResponse(response: GetAccountResponse): Account {
    return {
      id: response.accountId,
      name: response.name,
      type: response.type === 'Organization' ? AccountType.Organization : AccountType.Individual,
      status: response.status === 'Active' ? AccountStatus.Active : AccountStatus.Inactive,
      balance: response.currentBalance,
      createdAt: parseISO(response.createdAt),
      updatedAt: parseISO(response.updatedAt)
    };
  }
}
```

### 6.2 Transaction Mappers

```typescript
export class TransactionMapper {
  static fromApiResponse(response: TransactionItemResponse): Transaction {
    return {
      id: response.transactionId,
      accountId: response.accountId,
      transactionDate: parseISO(response.transactionDate),
      type: response.type === 'Charge' ? TransactionType.Charge : TransactionType.Payment,
      description: response.description,
      debitAmount: response.debitAmount,
      creditAmount: response.creditAmount,
      runningBalance: response.runningBalance,
      sourceReferenceId: response.sourceReferenceId
    };
  }
}
```

### 6.3 Invoice Mappers

```typescript
export class InvoiceMapper {
  static fromApiResponse(response: GenerateInvoiceResponse): Invoice {
    return {
      invoiceNumber: response.invoiceNumber,
      accountId: response.accountId,
      accountName: response.accountName,
      billingPeriodStart: parseISO(response.billingPeriodStart),
      billingPeriodEnd: parseISO(response.billingPeriodEnd),
      lineItems: response.lineItems.map(item => ({
        rideId: item.rideId,
        serviceDate: parseISO(item.serviceDate),
        fareAmount: item.fareAmount,
        description: item.description
      })),
      subtotal: response.subtotal,
      totalPaymentsApplied: response.totalPaymentsApplied,
      outstandingBalance: response.outstandingBalance,
      generatedAt: parseISO(response.generatedAt)
    };
  }
}
```

---

## 7. Validation Models

### 7.1 Form Validation Rules

```typescript
export const CHARGE_FORM_VALIDATION_RULES = {
  rideId: {
    required: true,
    minLength: 1,
    maxLength: 100
  },
  fareAmount: {
    required: true,
    min: 0.01,
    max: 999999.99,
    maxDecimals: 2
  },
  serviceDate: {
    required: true,
    notFutureDate: true
  },
  description: {
    maxLength: 500
  }
} as const;

export const PAYMENT_FORM_VALIDATION_RULES = {
  paymentReferenceId: {
    required: true,
    minLength: 1,
    maxLength: 100
  },
  amount: {
    required: true,
    min: 0.01,
    max: 999999.99,
    maxDecimals: 2
  },
  paymentDate: {
    required: true,
    notFutureDate: true
  },
  notes: {
    maxLength: 500
  }
} as const;
```

---

## 8. Search Models

### 8.1 Account Search Model

```typescript
export interface AccountSearchQuery {
  query: string;
  limit: number;
}

export interface AccountSearchResult {
  accountId: string;
  accountNumber: string;
  name: string;
  currentBalance: number;
  type: AccountType;
}
```

---

## 9. Notification Models

### 9.1 Toast Notification Model

```typescript
export interface ToastNotification {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}
```

---

## Summary

All frontend models defined with:
- **Core Entities**: Account, Transaction, Invoice with TypeScript interfaces
- **Form Models**: ChargeFormData, PaymentFormData, InvoiceGenerationFormData
- **API Response Models**: Strongly typed responses matching backend OpenAPI contracts
- **Filter/Pagination**: Transaction filtering, pagination controls
- **UI State**: Loading, error, success state interfaces
- **Mappers**: API response → domain model transformations
- **Validation**: Centralized validation rules
- **Search**: Account search query and result models

**Status**: ✅ Complete - Ready for component development

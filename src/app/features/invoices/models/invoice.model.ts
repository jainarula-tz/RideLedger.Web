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
  status: InvoiceStatus;
}

export interface InvoiceLineItem {
  rideId: string;
  serviceDate: Date;
  fareAmount: number;
  description: string;
}

export enum InvoiceStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Paid = 'Paid',
  Overdue = 'Overdue'
}

export interface GenerateInvoiceRequest {
  accountId: string;
  billingPeriodStart: string; // ISO date
  billingPeriodEnd: string; // ISO date
}

export interface InvoiceListItem {
  invoiceNumber: string;
  accountName: string;
  generatedAt: Date;
  subtotal: number;
  outstandingBalance: number;
  status: InvoiceStatus;
}

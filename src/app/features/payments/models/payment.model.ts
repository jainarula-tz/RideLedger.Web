export interface PaymentFormData {
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  paymentDate: Date;
  paymentMode: PaymentMode;
  notes: string;
}

export enum PaymentMode {
  Cash = 1,
  Card = 2,
  BankTransfer = 3,
}

export interface PaymentRequest {
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  paymentDate: string; // ISO date string
  paymentMode: number; // Numeric enum value
  notes?: string;
}

export interface PaymentResponse {
  transactionId: string;
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  recordedAt: Date;
}

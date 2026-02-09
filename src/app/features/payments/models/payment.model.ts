export interface PaymentFormData {
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  paymentDate: Date;
  paymentMode: PaymentMode;
  notes: string;
}

export enum PaymentMode {
  Cash = 'Cash',
  Card = 'Card',
  BankTransfer = 'BankTransfer'
}

export interface PaymentRequest {
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  paymentDate: string; // ISO date string
  paymentMode: PaymentMode;
  notes?: string;
}

export interface PaymentResponse {
  transactionId: string;
  accountId: string;
  paymentReferenceId: string;
  amount: number;
  recordedAt: Date;
}

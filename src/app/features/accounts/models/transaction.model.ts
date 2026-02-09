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

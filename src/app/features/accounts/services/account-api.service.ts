import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  constructor(private apiService: ApiService) {}

  getAccount(accountId: string): Observable<Account> {
    // TODO: Replace with actual API call when backend is ready
    // return this.apiService.get<Account>(`accounts/${accountId}`);
    
    // Mock data for now
    return of({
      id: accountId,
      name: 'City Hospital',
      type: 'Organization' as any,
      status: 'Active' as any,
      balance: 500.00,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    // TODO: Replace with actual API call when backend is ready
    // return this.apiService.get<Transaction[]>(`accounts/${accountId}/transactions`);
    
    // Extended mock data for filtering/pagination demonstration
    return of([
      {
        id: '1',
        accountId,
        transactionDate: new Date('2026-02-08'),
        type: 'Charge' as any,
        description: 'Ride Service - Downtown',
        debitAmount: 45.50,
        creditAmount: null,
        runningBalance: 500.00,
        sourceReferenceId: 'RIDE-001'
      },
      {
        id: '2',
        accountId,
        transactionDate: new Date('2026-02-07'),
        type: 'Payment' as any,
        description: 'Payment Received - Credit Card',
        debitAmount: null,
        creditAmount: 100.00,
        runningBalance: 454.50,
        sourceReferenceId: 'PAY-001'
      },
      {
        id: '3',
        accountId,
        transactionDate: new Date('2026-02-06'),
        type: 'Charge' as any,
        description: 'Ride Service - Airport',
        debitAmount: 75.00,
        creditAmount: null,
        runningBalance: 554.50,
        sourceReferenceId: 'RIDE-002'
      },
      {
        id: '4',
        accountId,
        transactionDate: new Date('2026-02-05'),
        type: 'Charge' as any,
        description: 'Ride Service - Hospital Visit',
        debitAmount: 35.25,
        creditAmount: null,
        runningBalance: 479.50,
        sourceReferenceId: 'RIDE-003'
      },
      {
        id: '5',
        accountId,
        transactionDate: new Date('2026-02-04'),
        type: 'Payment' as any,
        description: 'Payment Received - Cash',
        debitAmount: null,
        creditAmount: 50.00,
        runningBalance: 444.25,
        sourceReferenceId: 'PAY-002'
      },
      {
        id: '6',
        accountId,
        transactionDate: new Date('2026-02-03'),
        type: 'Charge' as any,
        description: 'Ride Service - Medical Center',
        debitAmount: 60.00,
        creditAmount: null,
        runningBalance: 494.25,
        sourceReferenceId: 'RIDE-004'
      },
      {
        id: '7',
        accountId,
        transactionDate: new Date('2026-02-02'),
        type: 'Charge' as any,
        description: 'Ride Service - Pharmacy',
        debitAmount: 25.50,
        creditAmount: null,
        runningBalance: 434.25,
        sourceReferenceId: 'RIDE-005'
      },
      {
        id: '8',
        accountId,
        transactionDate: new Date('2026-02-01'),
        type: 'Payment' as any,
        description: 'Payment Received - Bank Transfer',
        debitAmount: null,
        creditAmount: 200.00,
        runningBalance: 408.75,
        sourceReferenceId: 'PAY-003'
      },
      {
        id: '9',
        accountId,
        transactionDate: new Date('2026-01-31'),
        type: 'Charge' as any,
        description: 'Ride Service - Clinic Visit',
        debitAmount: 40.00,
        creditAmount: null,
        runningBalance: 608.75,
        sourceReferenceId: 'RIDE-006'
      },
      {
        id: '10',
        accountId,
        transactionDate: new Date('2026-01-30'),
        type: 'Charge' as any,
        description: 'Ride Service - Emergency Transport',
        debitAmount: 95.00,
        creditAmount: null,
        runningBalance: 568.75,
        sourceReferenceId: 'RIDE-007'
      },
      {
        id: '11',
        accountId,
        transactionDate: new Date('2026-01-29'),
        type: 'Payment' as any,
        description: 'Payment Received - Check',
        debitAmount: null,
        creditAmount: 150.00,
        runningBalance: 473.75,
        sourceReferenceId: 'PAY-004'
      },
      {
        id: '12',
        accountId,
        transactionDate: new Date('2026-01-28'),
        type: 'Charge' as any,
        description: 'Ride Service - Routine Checkup',
        debitAmount: 30.25,
        creditAmount: null,
        runningBalance: 623.75,
        sourceReferenceId: 'RIDE-008'
      }
    ]);
  }
}

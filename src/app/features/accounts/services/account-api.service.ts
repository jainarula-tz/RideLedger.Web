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

  getTransactions(accountId: string, limit: number = 10): Observable<Transaction[]> {
    // TODO: Replace with actual API call when backend is ready
    // return this.apiService.get<Transaction[]>(`accounts/${accountId}/transactions`);
    
    // Mock data for now
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
        description: 'Payment Received',
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
        description: 'Payment Received',
        debitAmount: null,
        creditAmount: 50.00,
        runningBalance: 444.25,
        sourceReferenceId: 'PAY-002'
      }
    ]);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  constructor(private apiService: ApiService) {}

  getAccount(accountId: string): Observable<Account> {
    // Real API call to backend
    return this.apiService.get<Account>(`accounts/${accountId}`);
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    // Real API call to backend  
    return this.apiService.get<Transaction[]>(`accounts/${accountId}/transactions`);
  }

  searchAccounts(query: string): Observable<Account[]> {
    // Real API call to backend
    return this.apiService.get<Account[]>(`accounts/search?q=${encodeURIComponent(query)}`);
  }

  getAccountBalance(accountId: string): Observable<{ balance: number; currency: string }> {
    // Real API call to backend
    return this.apiService.get<{ balance: number; currency: string }>( `accounts/${accountId}/balance`);
  }
}

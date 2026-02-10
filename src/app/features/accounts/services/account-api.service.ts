import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  constructor(private apiService: ApiService) {}

  getAccount(accountId: string): Observable<Account> {
    // Real API call to backend
    return this.apiService.get<Account>(`accounts/${accountId}`);
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    // Real API call to backend - returns paginated response
    return this.apiService
      .get<{
        transactions: Transaction[];
      }>(`accounts/${accountId}/transactions?pageNumber=1&pageSize=100`)
      .pipe(map((response) => response.transactions));
  }

  searchAccounts(query: string): Observable<Account[]> {
    // Real API call to backend
    return this.apiService.get<Account[]>(`accounts/search?q=${encodeURIComponent(query)}`);
  }

  getAccountBalance(accountId: string): Observable<{ balance: number; currency: string }> {
    // Real API call to backend
    return this.apiService.get<{ balance: number; currency: string }>(
      `accounts/${accountId}/balance`
    );
  }
}

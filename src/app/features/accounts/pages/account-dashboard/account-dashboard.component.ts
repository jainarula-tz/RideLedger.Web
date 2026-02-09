import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountApiService } from '../../services/account-api.service';
import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss']
})
export class AccountDashboardComponent implements OnInit {
  account: Account | null = null;
  transactions: Transaction[] = [];
  isLoading = true;

  constructor(private accountApiService: AccountApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    
    // Mock account ID for now
    const accountId = 'acc-001';
    
    this.accountApiService.getAccount(accountId).subscribe({
      next: (account) => {
        this.account = account;
        this.loadTransactions(accountId);
      },
      error: (error) => {
        console.error('Error loading account:', error);
        this.isLoading = false;
      }
    });
  }

  loadTransactions(accountId: string): void {
    this.accountApiService.getTransactions(accountId, 5).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.isLoading = false;
      }
    });
  }

  loadMoreTransactions(): void {
    // TODO: Implement pagination
    console.log('Load more transactions');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountApiService } from '../../services/account-api.service';
import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';
import { TransactionFilter } from '../../components/transaction-filter/transaction-filter.component';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
  standalone: false
})
export class AccountDashboardComponent implements OnInit {
  account: Account | null = null;
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  isLoading = true;

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  // Filter state
  currentFilter: TransactionFilter = {};

  constructor(
    private accountApiService: AccountApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  navigateToSearch(): void {
    this.router.navigate(['/accounts/search']);
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
    this.accountApiService.getTransactions(accountId).subscribe({
      next: (transactions) => {
        this.allTransactions = transactions;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.isLoading = false;
      }
    });
  }

  onFilterChange(filter: TransactionFilter): void {
    this.currentFilter = filter;
    this.currentPage = 1; // Reset to first page on filter change
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allTransactions];

    // Apply date range filter
    if (this.currentFilter.startDate) {
      const startDate = new Date(this.currentFilter.startDate);
      filtered = filtered.filter(t => new Date(t.transactionDate) >= startDate);
    }

    if (this.currentFilter.endDate) {
      const endDate = new Date(this.currentFilter.endDate);
      endDate.setHours(23, 59, 59, 999); // Include entire end date
      filtered = filtered.filter(t => new Date(t.transactionDate) <= endDate);
    }

    // Apply transaction type filter
    if (this.currentFilter.transactionType) {
      filtered = filtered.filter(t => t.type === this.currentFilter.transactionType);
    }

    this.filteredTransactions = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  get hasFilters(): boolean {
    return !!(this.currentFilter.startDate || this.currentFilter.endDate || this.currentFilter.transactionType);
  }

  get startRecord(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredTransactions.length);
  }

  loadMoreTransactions(): void {
    // TODO: Implement pagination
    console.log('Load more transactions');
  }
}

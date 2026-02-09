import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccountApiService } from '../../services/account-api.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss']
})
export class AccountSearchComponent implements OnInit {
  searchControl = new FormControl('');
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];
  isLoading = false;

  constructor(private accountApiService: AccountApiService) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.setupSearch();
  }

  loadAccounts(): void {
    this.isLoading = true;
    
    // Mock data - would be replaced with actual API call
    this.accounts = [
      {
        id: 'acc-001',
        name: 'City Hospital',
        type: 'Organization' as any,
        status: 'Active' as any,
        balance: 500.00,
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-02-08')
      },
      {
        id: 'acc-002',
        name: 'East Medical Center',
        type: 'Organization' as any,
        status: 'Active' as any,
        balance: 1250.50,
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-02-07')
      },
      {
        id: 'acc-003',
        name: 'John Smith',
        type: 'Individual' as any,
        status: 'Active' as any,
        balance: 75.00,
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-05')
      },
      {
        id: 'acc-004',
        name: 'West Health Clinic',
        type: 'Organization' as any,
        status: 'Inactive' as any,
        balance: 0.00,
        createdAt: new Date('2025-12-10'),
        updatedAt: new Date('2026-01-15')
      },
      {
        id: 'acc-005',
        name: 'Sarah Johnson',
        type: 'Individual' as any,
        status: 'Active' as any,
        balance: 225.75,
        createdAt: new Date('2026-01-25'),
        updatedAt: new Date('2026-02-09')
      }
    ];
    
    this.filteredAccounts = [...this.accounts];
    this.isLoading = false;
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterAccounts(searchTerm || '');
      });
  }

  filterAccounts(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredAccounts = [...this.accounts];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.name.toLowerCase().includes(term) ||
      account.id.toLowerCase().includes(term) ||
      account.type.toLowerCase().includes(term)
    );
  }

  getStatusColor(status: string): string {
    return status === 'Active' ? 'bg-primary-900 text-primary-300 border-primary-700' : 'bg-gray-800 text-gray-400 border-gray-700';
  }

  getTypeColor(type: string): string {
    return type === 'Organization' ? 'bg-blue-900 text-blue-300 border-blue-700' : 'bg-purple-900 text-purple-300 border-purple-700';
  }
}

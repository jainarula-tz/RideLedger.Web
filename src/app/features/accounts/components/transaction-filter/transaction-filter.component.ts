import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionType } from '../../models/transaction.model';

export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  transactionType?: TransactionType | 'all';
}

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent {
  @Output() filterChange = new EventEmitter<TransactionFilter>();
  
  filterForm!: FormGroup;
  isExpanded = false;

  TransactionType = TransactionType;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      transactionType: ['all']
    });

    // Emit filter changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  toggleFilter(): void {
    this.isExpanded = !this.isExpanded;
  }

  applyFilter(): void {
    const values = this.filterForm.value;
    const filter: TransactionFilter = {
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      transactionType: values.transactionType === 'all' ? undefined : values.transactionType
    };
    this.filterChange.emit(filter);
  }

  clearFilter(): void {
    this.filterForm.reset({
      startDate: '',
      endDate: '',
      transactionType: 'all'
    });
  }

  hasActiveFilters(): boolean {
    const values = this.filterForm.value;
    return !!(values.startDate || values.endDate || values.transactionType !== 'all');
  }
}

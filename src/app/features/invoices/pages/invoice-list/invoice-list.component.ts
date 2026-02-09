import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { InvoiceListItem, InvoiceStatus } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceListItem[] = [];
  filteredInvoices: InvoiceListItem[] = [];
  isLoading = true;
  selectedStatus: string = 'all';

  InvoiceStatus = InvoiceStatus;

  constructor(private invoiceApiService: InvoiceApiService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.isLoading = true;
    this.invoiceApiService.getInvoices().subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.filteredInvoices = [...invoices];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
        this.isLoading = false;
      }
    });
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    if (status === 'all') {
      this.filteredInvoices = [...this.invoices];
    } else {
      this.filteredInvoices = this.invoices.filter(inv => inv.status === status);
    }
  }

  getStatusColor(status: InvoiceStatus): string {
    const colors = {
      [InvoiceStatus.Draft]: 'bg-gray-800 text-gray-300 border-gray-700',
      [InvoiceStatus.Sent]: 'bg-blue-900 text-blue-300 border-blue-700',
      [InvoiceStatus.Paid]: 'bg-primary-900 text-primary-300 border-primary-700',
      [InvoiceStatus.Overdue]: 'bg-red-900 text-red-300 border-red-700'
    };
    return colors[status] || colors[InvoiceStatus.Draft];
  }

  getStatusIcon(status: InvoiceStatus): string {
    const icons = {
      [InvoiceStatus.Draft]: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      [InvoiceStatus.Sent]: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      [InvoiceStatus.Paid]: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      [InvoiceStatus.Overdue]: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[status] || icons[InvoiceStatus.Draft];
  }
}

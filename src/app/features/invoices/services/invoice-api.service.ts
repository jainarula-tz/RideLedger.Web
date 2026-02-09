import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Invoice, InvoiceListItem, GenerateInvoiceRequest, InvoiceStatus } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  constructor(private apiService: ApiService) {}

  getInvoices(): Observable<InvoiceListItem[]> {
    // TODO: Replace with actual API call
    // return this.apiService.get<InvoiceListItem[]>('invoices');
    
    // Mock data
    return of([
      {
        invoiceNumber: 'INV-2026-001',
        accountName: 'City Hospital',
        generatedAt: new Date('2026-02-01'),
        subtotal: 450.00,
        outstandingBalance: 450.00,
        status: InvoiceStatus.Sent
      },
      {
        invoiceNumber: 'INV-2026-002',
        accountName: 'East Medical Center',
        generatedAt: new Date('2026-02-05'),
        subtotal: 1250.50,
        outstandingBalance: 0.00,
        status: InvoiceStatus.Paid
      },
      {
        invoiceNumber: 'INV-2026-003',
        accountName: 'John Smith',
        generatedAt: new Date('2026-01-25'),
        subtotal: 225.75,
        outstandingBalance: 225.75,
        status: InvoiceStatus.Overdue
      }
    ]).pipe(delay(300));
  }

  getInvoiceDetail(invoiceNumber: string): Observable<Invoice> {
    // TODO: Replace with actual API call
    // return this.apiService.get<Invoice>(`invoices/${invoiceNumber}`);
    
    // Mock data
    return of({
      invoiceNumber: 'INV-2026-001',
      accountId: 'acc-001',
      accountName: 'City Hospital',
      billingPeriodStart: new Date('2026-01-01'),
      billingPeriodEnd: new Date('2026-01-31'),
      lineItems: [
        {
          rideId: 'RIDE-001',
          serviceDate: new Date('2026-01-15'),
          fareAmount: 150.00,
          description: 'Transport to City Hospital - Wheelchair accessible'
        },
        {
          rideId: 'RIDE-005',
          serviceDate: new Date('2026-01-20'),
          fareAmount: 200.00,
          description: 'Transport to Medical Clinic - Standard service'
        },
        {
          rideId: 'RIDE-012',
          serviceDate: new Date('2026-01-28'),
          fareAmount: 100.00,
          description: 'Return transport from hospital'
        }
      ],
      subtotal: 450.00,
      totalPaymentsApplied: 0.00,
      outstandingBalance: 450.00,
      generatedAt: new Date('2026-02-01'),
      status: InvoiceStatus.Sent
    }).pipe(delay(300));
  }

  generateInvoice(request: GenerateInvoiceRequest): Observable<Invoice> {
    // TODO: Replace with actual API call
    // return this.apiService.post<Invoice>('invoices/generate', request);
    
    // Mock response
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    return of({
      invoiceNumber,
      accountId: request.accountId,
      accountName: 'City Hospital',
      billingPeriodStart: new Date(request.billingPeriodStart),
      billingPeriodEnd: new Date(request.billingPeriodEnd),
      lineItems: [
        {
          rideId: 'RIDE-001',
          serviceDate: new Date(),
          fareAmount: 150.00,
          description: 'Transport service'
        }
      ],
      subtotal: 150.00,
      totalPaymentsApplied: 0.00,
      outstandingBalance: 150.00,
      generatedAt: new Date(),
      status: InvoiceStatus.Draft
    }).pipe(delay(500));
  }
}

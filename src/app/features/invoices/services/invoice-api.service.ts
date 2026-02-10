import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Invoice, InvoiceListItem, GenerateInvoiceRequest } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApiService {
  constructor(private apiService: ApiService) {}

  getInvoices(): Observable<InvoiceListItem[]> {
    // Real API call to backend - returns paginated response or might not be implemented
    // For now, return empty array if the endpoint fails
    return this.apiService
      .get<{ invoices: InvoiceListItem[] }>('invoices?page=1&pageSize=100')
      .pipe(
        map((response) => response.invoices || []),
        catchError((error) => {
          console.error('Invoice API not available:', error);
          return of([]); // Return empty array if API fails
        })
      );
  }

  getInvoiceDetail(invoiceNumber: string): Observable<Invoice> {
    // Real API call to backend
    return this.apiService.get<Invoice>(`invoices/${invoiceNumber}`);
  }

  generateInvoice(request: GenerateInvoiceRequest): Observable<Invoice> {
    // Real API call to backend
    return this.apiService.post<Invoice>('invoices/generate', request);
  }

  downloadInvoicePdf(invoiceNumber: string): Observable<Blob> {
    // Real API call to backend for PDF download
    return this.apiService.get<Blob>(`invoices/${invoiceNumber}/pdf`, { responseType: 'blob' });
  }
}

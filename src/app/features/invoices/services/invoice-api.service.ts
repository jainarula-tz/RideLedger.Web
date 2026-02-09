import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Invoice, InvoiceListItem, GenerateInvoiceRequest } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  constructor(private apiService: ApiService) {}

  getInvoices(): Observable<InvoiceListItem[]> {
    // Real API call to backend
    return this.apiService.get<InvoiceListItem[]>('invoices');
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

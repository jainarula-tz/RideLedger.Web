import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { PaymentRequest, PaymentResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {
  constructor(private apiService: ApiService) {}

  recordPayment(request: PaymentRequest): Observable<PaymentResponse> {
    // TODO: Replace with actual API call when backend is ready
    // return this.apiService.post<PaymentResponse>('payments', request);
    
    // Mock response for now
    return of({
      transactionId: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      accountId: request.accountId,
      paymentReferenceId: request.paymentReferenceId,
      amount: request.amount,
      recordedAt: new Date()
    }).pipe(delay(500)); // Simulate network delay
  }
}

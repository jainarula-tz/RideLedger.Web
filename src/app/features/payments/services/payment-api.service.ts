import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { PaymentRequest, PaymentResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {
  constructor(private apiService: ApiService) {}

  recordPayment(request: PaymentRequest): Observable<PaymentResponse> {
    // Real API call to backend
    return this.apiService.post<PaymentResponse>('payments', request);
  }
}

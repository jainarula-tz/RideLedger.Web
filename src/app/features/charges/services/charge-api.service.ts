import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ChargeRequest, ChargeResponse } from '../models/charge.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeApiService {
  constructor(private apiService: ApiService) {}

  recordCharge(request: ChargeRequest): Observable<ChargeResponse> {
    // TODO: Replace with actual API call when backend is ready
    // return this.apiService.post<ChargeResponse>('charges', request);
    
    // Mock response for now
    return of({
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      accountId: request.accountId,
      rideId: request.rideId,
      fareAmount: request.fareAmount,
      recordedAt: new Date()
    }).pipe(delay(500)); // Simulate network delay
  }
}

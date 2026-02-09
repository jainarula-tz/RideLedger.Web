import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ChargeRequest, ChargeResponse } from '../models/charge.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeApiService {
  constructor(private apiService: ApiService) {}

  recordCharge(request: ChargeRequest): Observable<ChargeResponse> {
    // Real API call to backend
    return this.apiService.post<ChargeResponse>('charges', request);
  }
}

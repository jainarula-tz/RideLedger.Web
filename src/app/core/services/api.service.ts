import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/v1'; // Will be replaced with environment variable

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: { params?: HttpParams; responseType?: 'json' | 'blob' | 'text' }): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    if (options?.responseType === 'blob') {
      return this.http.get(url, { params: options.params, responseType: 'blob' }) as Observable<T>;
    }
    return this.http.get<T>(url, { params: options?.params });
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}

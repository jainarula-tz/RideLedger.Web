import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * CORE - Interceptor
 * Adds Authorization header with Bearer token to all HTTP requests
 * TODO: Integrate with real authentication service when ready
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage (or from AuthService in the future)
    const token = this.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  private getAuthToken(): string | null {
    // TODO: Replace with proper token management from AuthService
    // For now, check localStorage
    return localStorage.getItem('auth_token');
  }
}

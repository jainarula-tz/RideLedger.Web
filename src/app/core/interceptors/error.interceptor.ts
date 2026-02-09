import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request: Please check your input';
              break;
            case 401:
              errorMessage = 'Unauthorized: Please log in';
              break;
            case 403:
              errorMessage = "Forbidden: You don't have permission";
              break;
            case 404:
              errorMessage = 'Not Found: Resource does not exist';
              break;
            case 409:
              errorMessage = error.error?.message || 'Conflict: Duplicate entry';
              break;
            case 422:
              errorMessage = error.error?.message || 'Validation Error';
              break;
            case 500:
              errorMessage = 'Internal Server Error: Please try again later';
              break;
            case 503:
              errorMessage = 'Service Unavailable: Server is temporarily unavailable';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
          }
        }

        // Show error notification
        this.notificationService.error(errorMessage);

        return throwError(() => error);
      })
    );
  }
}

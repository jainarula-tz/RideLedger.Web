import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountDashboardComponent } from './features/accounts/pages/account-dashboard/account-dashboard.component';
import { AccountSearchComponent } from './features/accounts/pages/account-search/account-search.component';
import { RecordChargeComponent } from './features/charges/pages/record-charge/record-charge.component';
import { RecordPaymentComponent } from './features/payments/pages/record-payment/record-payment.component';
import { InvoiceListComponent } from './features/invoices/pages/invoice-list/invoice-list.component';
import { GenerateInvoiceComponent } from './features/invoices/pages/generate-invoice/generate-invoice.component';
import { TransactionFilterComponent } from './features/accounts/components/transaction-filter/transaction-filter.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, AccountDashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AccountSearchComponent, // Standalone component
    RecordChargeComponent, // Standalone component
    RecordPaymentComponent, // Standalone component
    InvoiceListComponent, // Standalone component
    GenerateInvoiceComponent, // Standalone component
    TransactionFilterComponent, // Standalone component
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

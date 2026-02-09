import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountDashboardComponent } from './features/accounts/pages/account-dashboard/account-dashboard.component';
import { AccountSearchComponent } from './features/accounts/pages/account-search/account-search.component';
import { RecordChargeComponent } from './features/charges/pages/record-charge/record-charge.component';
import { RecordPaymentComponent } from './features/payments/pages/record-payment/record-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AccountSearchComponent, // Standalone component
    RecordChargeComponent, // Standalone component
    RecordPaymentComponent, // Standalone component
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

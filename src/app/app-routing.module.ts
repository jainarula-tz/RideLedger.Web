import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDashboardComponent } from './features/accounts/pages/account-dashboard/account-dashboard.component';
import { AccountSearchComponent } from './features/accounts/pages/account-search/account-search.component';
import { RecordChargeComponent } from './features/charges/pages/record-charge/record-charge.component';
import { RecordPaymentComponent } from './features/payments/pages/record-payment/record-payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AccountDashboardComponent },
  { path: 'accounts/search', component: AccountSearchComponent },
  { path: 'charges/new', component: RecordChargeComponent },
  { path: 'payments/new', component: RecordPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

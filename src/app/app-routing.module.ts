import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDashboardComponent } from './features/accounts/pages/account-dashboard/account-dashboard.component';
import { RecordChargeComponent } from './features/charges/pages/record-charge/record-charge.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AccountDashboardComponent },
  { path: 'charges/new', component: RecordChargeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

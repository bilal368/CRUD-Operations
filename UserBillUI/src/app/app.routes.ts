import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BillListComponent } from './components/bill-list/bill-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id/bills', component: BillListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingListComponent} from './pages/billing-list/billing-list.component'

const routes: Routes = [
  {
    path: '',
    component: BillingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }

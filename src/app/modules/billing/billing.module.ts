import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingListComponent } from './pages/billing-list/billing-list.component';
import {CdkTableModule} from "@angular/cdk/table";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BillingListComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    CdkTableModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BillingModule { }

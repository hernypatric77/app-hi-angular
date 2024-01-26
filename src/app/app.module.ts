import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {OverlayModule} from '@angular/cdk/overlay';
import {DialogModule} from '@angular/cdk/dialog';
import {CdkTableModule} from '@angular/cdk/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtnComponent } from './modules/billing/components/btn/btn.component';
import {BillingComponent} from "./modules/billing/pages/billing/billing.component";

@NgModule({
  declarations: [
    AppComponent,
    BtnComponent,
    BillingComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    AppRoutingModule,
    FontAwesomeModule,
    DialogModule,
    CdkTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  exports: [
    BtnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  PoDialogModule,
  PoHttpInterceptorModule,
  PoModule,
  PoPageModule,
} from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import {
  PoModalPasswordRecoveryModule,
  PoPageChangePasswordModule,
  PoPageDynamicEditModule,
  PoPageDynamicTableModule,
  PoPageLoginModule,
  PoTemplatesModule,
} from '@po-ui/ng-templates';
import { DefaultComponent } from './layout/default/default.component';
import { ListComponent } from './pages/list/list.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateItemComponent } from './pages/update-item/update-item.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    ListComponent,
    NewItemComponent,
    UpdateItemComponent,
    ViewItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoPageModule,
    HttpClientModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoTemplatesModule,
    PoDialogModule,
    PoPageLoginModule,
    PoHttpInterceptorModule,
    PoModalPasswordRecoveryModule,
    PoPageChangePasswordModule,
    PoPageDynamicTableModule,
    PoPageDynamicEditModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

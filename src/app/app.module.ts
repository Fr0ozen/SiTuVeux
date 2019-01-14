import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/app.component';
import { Test2Component } from './test2/app.component';

@NgModule({
  declarations: [
    TestComponent,
    Test2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [TestComponent, Test2Component]
})
export class AppModule { }

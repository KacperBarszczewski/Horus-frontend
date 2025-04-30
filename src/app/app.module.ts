import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeSelectComponent } from './components/employee-select/employee-select.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EmployeeSelectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

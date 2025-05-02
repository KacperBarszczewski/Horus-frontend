import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeSelectComponent } from './components/employee-select/employee-select.component';
import { EmployeeTreeComponent } from './components/employee-tree/employee-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTreeComponent,
  ],
  imports: [
    BrowserModule,
    EmployeeSelectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

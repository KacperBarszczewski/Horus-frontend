import { Component } from '@angular/core';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedEmployee: Employee | null = null;

  onValueEmitted(value: Employee | null) {
    this.selectedEmployee = value;
  }

}

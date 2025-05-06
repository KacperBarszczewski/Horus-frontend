import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class EmployeeSelectComponent implements OnInit {
  @Output() selectedEmployee = new EventEmitter<Employee | null>();

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';
  showDropdown = false;
  activeIndex = -1;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  onSearchChange() {
    this.filteredEmployees = this.employees.filter(employee =>
      `${employee.firstName} ${employee.lastName}`.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );
    this.activeIndex = -1;
  }

  select(employee: Employee) {
    this.searchTerm = `${employee.firstName} ${employee.lastName}`;
    this.showDropdown = false;
    this.onSearchChange();
    this.selectedEmployee.emit(employee);
  }

  onKeyDown(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.key === 'ArrowDown') {
      this.activeIndex = Math.min(this.activeIndex + 1, this.filteredEmployees.length - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      event.preventDefault();
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      this.select(this.filteredEmployees[this.activeIndex]);
      input.blur();
    }
  }

}

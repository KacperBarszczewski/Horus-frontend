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
  @Output() selectedEmployeeID = new EventEmitter<string>();

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  onSearchChange() {
    this.filteredEmployees = this.employees.filter(employee =>
      `${employee.firstName} ${employee.lastName}`.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );
  }

  onSelect(event: Event) {
    const selectedEmployee = (event.target as HTMLSelectElement).value;
    this.selectedEmployeeID.emit(selectedEmployee);
  }

}

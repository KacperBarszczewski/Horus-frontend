import { Component, Input, SimpleChanges } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-tree',
  templateUrl: './employee-tree.component.html',
  styleUrls: ['./employee-tree.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class EmployeeTreeComponent {
  @Input() selectedEmployee: Employee | null = null;

  employeeSubtree: Employee[] | null = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.employeeSubtree = this.employeeService.findEmployeeSubtree(this.selectedEmployee);
    }
  }



}

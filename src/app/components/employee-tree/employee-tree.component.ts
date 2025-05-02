import { Component, Input, SimpleChanges } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-tree',
  templateUrl: './employee-tree.component.html',
  styleUrls: ['./employee-tree.component.css'],
  standalone: true
})
export class EmployeeTreeComponent {
  @Input() selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee'] && this.selectedEmployee) {

      const result = this.employeeService.findEmployeeSubtree(this.selectedEmployee);
      console.log(result);
    }
  }



}

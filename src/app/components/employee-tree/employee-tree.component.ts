import { Component, Input, SimpleChanges } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeNode } from '../../models/employee-node';

@Component({
  selector: 'app-employee-tree',
  templateUrl: './employee-tree.component.html',
  styleUrls: ['./employee-tree.component.css'],
  standalone: true
})
export class EmployeeTreeComponent {
  @Input() selectedEmployee: Employee | null = null;

  employeesStructure: EmployeeNode | null = null;

  constructor(private employeeService: EmployeeService) {
    this.employeesStructure = this.employeeService.getEmployeeStructure();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee'] && this.selectedEmployee && this.employeesStructure) {
      
      const result = this.findEmployeeSubtree(this.selectedEmployee, this.employeesStructure);
      console.log(result);
    }
  }


  private findEmployeeSubtree(selectedEmployee: Employee, currentNode: EmployeeNode, path: EmployeeNode[] = []): EmployeeNode[] | null {

    path.push(currentNode);
    if (currentNode.id === selectedEmployee.id) {
      return path;
    }

    for (const subordinate of currentNode.subordinates) {
      const result = this.findEmployeeSubtree(selectedEmployee, subordinate, path);
      if (result) {
        return result;
      }
    }

    path.pop();
    return null;
  }


}

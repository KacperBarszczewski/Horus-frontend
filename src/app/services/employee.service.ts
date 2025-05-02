import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import employeesData from '../data/employees.json';
import employeesStructureData from '../data/employee-structure.json';
import { EmployeeNode } from '../models/employee-node';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = employeesData;
  private employeesStructureData: EmployeeNode = employeesStructureData;

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeStructure(): EmployeeNode {
    return this.employeesStructureData;
  }

  findEmployeeSubtree(
    selectedEmployee: Employee,
    currentNode: EmployeeNode = employeesStructureData,
    path: EmployeeNode[] = []
  ): EmployeeNode[] | null {

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

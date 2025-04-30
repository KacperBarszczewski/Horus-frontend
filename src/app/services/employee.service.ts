import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import employeesData from '../data/employees.json';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  private employees: Employee[] = employeesData;

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }
  
}

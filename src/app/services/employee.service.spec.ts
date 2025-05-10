import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee';
import { EmployeeNode } from '../models/employee-node';

const mockEmployees: Employee[] = [
    { firstName: 'Anna', lastName: 'CEO', id: "1", },
    { firstName: 'Bartek', lastName: 'Manager', id: "2" },
    { firstName: 'Celina', lastName: 'Developer', id: "3" }
];

const mockEmployeeStructure: EmployeeNode = {
    firstName: 'Anna',
    lastName: 'CEO',
    id: "1",
    subordinates: [
        {

            firstName: 'Bartek',
            lastName: 'Manager',
            id: "2",
            subordinates: [
                { firstName: 'Celina', lastName: 'Developer', id: "3", subordinates: [] }
            ]
        }
    ]
};

describe('EmployeeService', () => {
    let service: EmployeeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EmployeeService);

        (service as any).employees = mockEmployees;
        (service as any).employeesStructureData = mockEmployeeStructure;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getEmployees() should return employee list', () => {
        const employees = service.getEmployees();

        expect(employees.length).toBe(3);
        expect(employees[0].firstName).toBe('Anna');
    });

    it('getEmployeeStructure() should return employee structure', () => {
        const structure = service.getEmployeeStructure();

        expect(structure.id).toBe("1");
        expect(structure.subordinates.length).toBe(1);
        expect(structure.subordinates[0].firstName).toBe('Bartek');
    });

    it('findEmployeeSubtree() should return path to existing employee', () => {
        const selected = mockEmployees[2];
        const path = service.findEmployeeSubtree(selected);

        console.log(selected);
        console.log(path);

        expect(path).toBeTruthy();
        expect(path!.length).toBe(3);
        expect(path![0].firstName).toBe('Anna');
        expect(path![1].firstName).toBe('Bartek');
        expect(path![2].firstName).toBe('Celina');
    });

    it('findEmployeeSubtree() should return null for non-existing employee', () => {
        const fakeEmployee: Employee = { id: "999", firstName: 'Fake', lastName: 'Fake' };
        const path = service.findEmployeeSubtree(fakeEmployee);

        expect(path).toBeNull();
    });

    it('findEmployeeSubtree() should return path with only root for root employee', () => {
        const rootEmployee = mockEmployees[0];
        const path = service.findEmployeeSubtree(rootEmployee);

        expect(path).toBeTruthy();
        expect(path!.length).toBe(1);
        expect(path![0].firstName).toBe('Anna');
    });
});

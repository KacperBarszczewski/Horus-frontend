import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeSelectComponent } from './employee-select.component';
import { EmployeeService } from '../../services/employee.service';

class MockEmployeeService {
  getEmployees() {
    return [
      { firstName: 'Anna', lastName: 'CEO', id: "1", },
      { firstName: 'Bartek', lastName: 'Manager', id: "2" },
      { firstName: 'Celina', lastName: 'Developer', id: "3" }
    ];
  }
}

describe('EmployeeSelectComponent', () => {
  let component: EmployeeSelectComponent;
  let fixture: ComponentFixture<EmployeeSelectComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSelectComponent,],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize employees and filteredEmployees on ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.employees.length).toBe(3);
    expect(component.filteredEmployees.length).toBe(3);
  });

  it('should filter employees on onSearchChange', () => {
    component.employees = employeeService.getEmployees();
    component.searchTerm = 'Anna';
    component.onSearchChange();

    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].firstName).toBe('Anna');
  });

  it('should select employee and emit event', () => {
    spyOn(component.selectedEmployee, 'emit');
    const emp = { firstName: 'John', lastName: 'Doe', id: '1' };
    component.select(emp);

    expect(component.searchTerm).toBe('John Doe');
    expect(component.showDropdown).toBe(false);
    expect(component.selectedEmployee.emit).toHaveBeenCalledWith(emp);
  });

  it('should select employee on Enter key in onKeyDown', () => {
    component.filteredEmployees = employeeService.getEmployees();
    component.activeIndex = 1;

    spyOn(component, 'select');
    const input = document.createElement('input');
    spyOn(input, 'blur');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event, input);

    expect(component.select).toHaveBeenCalledWith(component.filteredEmployees[1]);
    expect(input.blur).toHaveBeenCalled();
  });

});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeTreeComponent } from './employee-tree.component';
import { Employee } from '../../models/employee';

describe('EmployeeTreeComponent', () => {
  let component: EmployeeTreeComponent;
  let fixture: ComponentFixture<EmployeeTreeComponent>;

  const mockSubtree: Employee[] = [
    { id: '1', firstName: 'Anna', lastName: 'CEO' },
    { id: '2', firstName: 'Bartek', lastName: 'Manager' },
    { id: '3', firstName: 'Celina', lastName: 'Developer' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTreeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTreeComponent);
    component = fixture.componentInstance;
  });

  it('should render empty container when no data is present', () => {
    component.employeeSubtree = null;
    fixture.detectChanges();

    const boxes = fixture.nativeElement.querySelectorAll('.box');
    expect(boxes.length).toBe(0);
  });

  it('should render one worker', () => {
    component.employeeSubtree = [mockSubtree[0]];
    fixture.detectChanges();

    const boxes = fixture.nativeElement.querySelectorAll('.box');
    const empBox = boxes[0].querySelector('.emp-box');
    
    expect(boxes.length).toBe(1);
    expect(empBox.textContent).toContain('Anna');
    expect(empBox.textContent).toContain('CEO');
  });

  it('should render multiple workers', () => {
    component.employeeSubtree = mockSubtree;
    fixture.detectChanges();

    const boxes = fixture.nativeElement.querySelectorAll('.box');
    expect(boxes.length).toBe(3);

    expect(boxes[0].querySelector('.emp-box').textContent).toContain('Anna');
    expect(boxes[1].querySelector('.emp-box').textContent).toContain('Bartek');
    expect(boxes[2].querySelector('.emp-box').textContent).toContain('Celina');
  });

  it('should update the view when data changes', () => {
    component.employeeSubtree = [mockSubtree[0]];
    fixture.detectChanges();
    
    let boxes = fixture.nativeElement.querySelectorAll('.box');
    expect(boxes.length).toBe(1);

    component.employeeSubtree = mockSubtree;
    fixture.detectChanges();
    
    boxes = fixture.nativeElement.querySelectorAll('.box');
    expect(boxes.length).toBe(3);
  });
});

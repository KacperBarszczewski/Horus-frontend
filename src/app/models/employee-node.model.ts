export interface EmployeeNode{
    firstName: string,
    lastName: string,
    id: string,
    subordinates: EmployeeNode[],
}
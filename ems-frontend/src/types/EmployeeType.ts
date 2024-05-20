
export interface Employee {
    [x: string]: any;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isDeleted: boolean;
    departmentId: number;
}

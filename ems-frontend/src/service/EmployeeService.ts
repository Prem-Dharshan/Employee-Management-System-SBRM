import axios from 'axios'
import { Employee } from '../types/EmployeeType'

const REST_API_BASE_URL = 'http://localhost:8080/api/'

export const listEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await axios.get<Employee[]>(`${REST_API_BASE_URL}employee/get/all`)
        return response.data
    } catch (error) {
        console.error('Error fetching employees:', error)
        throw error
    }
}

export const createEmployee = async (
    employee: Omit<Employee, 'id' | 'isDeleted'>,
): Promise<Employee> => {
    try {
        const response = await axios.post<Employee>(`${REST_API_BASE_URL}employee/create`, employee)
        return response.data
    } catch (error) {
        console.error('Error creating employee:', error)
        throw error
    }
}

export const getEmployee = (employeeId: number) =>
    axios.get(REST_API_BASE_URL + 'employee/get/' + employeeId)

export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
    try {
        const response = await axios.put<Employee>(
            `${REST_API_BASE_URL}employee/update/${id}`,
            employee,
        )
        return response.data
    } catch (error) {
        console.error('Error updating employee:', error)
        throw error
    }
}

export const deleteEmployee = (id: number) =>
    axios.delete(`${REST_API_BASE_URL}employee/delete/${id}`)

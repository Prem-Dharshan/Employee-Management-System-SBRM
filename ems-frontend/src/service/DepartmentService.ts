import axios from "axios";
import { Department } from "../types/DepartmentType";

const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/department';

export const getAllDepartments = () => {
    return axios.get(`${DEPARTMENT_REST_API_BASE_URL}/get/all`);
}

export const createDepartment = (department: Department) => {
    return axios.post(`${DEPARTMENT_REST_API_BASE_URL}/create`, department);
}

export const getDepartmentById = (id: number) => {
    return axios.get(`${DEPARTMENT_REST_API_BASE_URL}/get/${id}`);
}

export const updateDepartment = (id: number, department: Department) => {
    return axios.put(`${DEPARTMENT_REST_API_BASE_URL}/update/${id}`, department);
};

export const deleteDepartment = (id: number) => {
    return axios.delete(`${DEPARTMENT_REST_API_BASE_URL}/delete/${id}`);
}
package com.dpd.emsbackend.service;

import com.dpd.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeByID(long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long id, EmployeeDto employeeDto);

    EmployeeDto deleteEmployee(long id);

    List<EmployeeDto> getAllPresentEmployees();
}

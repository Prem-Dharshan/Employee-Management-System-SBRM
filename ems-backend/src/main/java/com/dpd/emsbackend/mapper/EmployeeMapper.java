package com.dpd.emsbackend.mapper;

import com.dpd.emsbackend.dto.EmployeeDto;
import com.dpd.emsbackend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.isDeleted(),
                employee.getDepartment().getId()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){

        if (employeeDto.getIsDeleted() == null) employeeDto.setIsDeleted(false);

        Employee employee = new Employee();

        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setDeleted(employeeDto.getIsDeleted());

        return employee;
    }

}

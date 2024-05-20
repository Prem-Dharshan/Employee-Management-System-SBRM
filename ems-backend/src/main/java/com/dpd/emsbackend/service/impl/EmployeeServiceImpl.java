package com.dpd.emsbackend.service.impl;

import com.dpd.emsbackend.dto.EmployeeDto;
import com.dpd.emsbackend.entity.Department;
import com.dpd.emsbackend.entity.Employee;
import com.dpd.emsbackend.exception.DuplicateEmailException;
import com.dpd.emsbackend.exception.ResourceNotFoundException;
import com.dpd.emsbackend.mapper.EmployeeMapper;
import com.dpd.emsbackend.repository.DepartmentRepository;
import com.dpd.emsbackend.repository.EmployeeRepository;
import com.dpd.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new DuplicateEmailException("Email " + employeeDto.getEmail() + " already exists.");
        }

        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department " + employeeDto.getDepartmentId() + " not found."));

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        employee.setDepartment(department);

        employeeRepository.createEmployee(
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment().getId()
        );

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public EmployeeDto getEmployeeByID(long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id : " + id));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map(
                EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList()
        );
    }

    @Override
    public EmployeeDto updateEmployee(long id, EmployeeDto employeeDto) {

        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id : " + id)
        );

        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(
                () -> new ResourceNotFoundException("Department " + employeeDto.getDepartmentId() + " not found.")
        );

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setDepartment(department);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto deleteEmployee(long id) {

        Employee employee = employeeRepository.findById(id).orElseThrow( () ->
                new ResourceNotFoundException("Employee is not exists with given id : " + id));

        employeeRepository.delete(employee);

        employee.setDeleted(true);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public List<EmployeeDto> getAllPresentEmployees() {
        List<Employee> presentEmployees = employeeRepository.findByIsDeletedFalse();
        return presentEmployees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }


}
package com.dpd.emsbackend.controller;

import com.dpd.emsbackend.dto.EmployeeDto;
import com.dpd.emsbackend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("create")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployeeDto = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployeeDto, HttpStatus.CREATED);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable long id) {

        EmployeeDto employee = employeeService.getEmployeeByID(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("get/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(@RequestParam(required = false, defaultValue = "false") Boolean includeDeleted) {

        if (!includeDeleted) {
            List<EmployeeDto> employeeDtoList = employeeService.getAllPresentEmployees();
            return new ResponseEntity<>(employeeDtoList, HttpStatus.OK);
        }
        else {
            List<EmployeeDto> employeeDtoList = employeeService.getAllEmployees();
            return new ResponseEntity<>(employeeDtoList, HttpStatus.OK);
        }
    }
    
    @PutMapping("update/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable long id, @RequestBody EmployeeDto employeeDto) {

        EmployeeDto updatedEmployee = employeeService.updateEmployee(id, employeeDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable long id) {

        EmployeeDto deletedEmployee = employeeService.deleteEmployee(id);
        return new ResponseEntity<>(deletedEmployee, HttpStatus.OK);
    }
}

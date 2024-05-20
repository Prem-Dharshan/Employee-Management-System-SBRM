package com.dpd.emsbackend.controller;

import com.dpd.emsbackend.dto.DepartmentDto;
import com.dpd.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/department")
public class DepartmentController {

    private DepartmentService departmentService;

    @PostMapping("create")
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {
        DepartmentDto department =  departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Long id) {
        DepartmentDto departmentDto = departmentService.getDepartmentById(id);
        return new ResponseEntity<>(departmentDto, HttpStatus.OK);
    }

    @GetMapping("get/all")
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        List<DepartmentDto> departmentDtos = departmentService.getAllDepartments();
        return new ResponseEntity<>(departmentDtos, HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long id, @RequestBody DepartmentDto departmentDto) {
        DepartmentDto department = departmentService.updateDepartment(id, departmentDto);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<DepartmentDto> deleteDepartment(@PathVariable("id") Long id) {
        DepartmentDto departmentDto = departmentService.deleteById(id);
        return new ResponseEntity<>(departmentDto, HttpStatus.OK);
    }
}
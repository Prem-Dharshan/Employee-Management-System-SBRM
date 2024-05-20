package com.dpd.emsbackend.service;

import com.dpd.emsbackend.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartmentById(Long id);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto);

    DepartmentDto deleteById(Long id);
}

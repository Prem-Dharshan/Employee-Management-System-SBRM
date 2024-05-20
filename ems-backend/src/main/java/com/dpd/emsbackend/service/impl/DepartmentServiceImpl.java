package com.dpd.emsbackend.service.impl;

import com.dpd.emsbackend.dto.DepartmentDto;
import com.dpd.emsbackend.entity.Department;
import com.dpd.emsbackend.exception.ResourceNotFoundException;
import com.dpd.emsbackend.mapper.DepartmentMapper;
import com.dpd.emsbackend.repository.DepartmentRepository;
import com.dpd.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

//        System.out.println(departmentDto.getDepartmentDescription());
        Department department = DepartmentMapper.maptoDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.maptoDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Department not found")
        );

        return DepartmentMapper.maptoDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map(DepartmentMapper::maptoDepartmentDto).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {

        Department department = departmentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Department not found")
        );

        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        department.setDepartmentName(departmentDto.getDepartmentName());

        Department updatedDepartment = departmentRepository.save(department);
        return DepartmentMapper.maptoDepartmentDto(updatedDepartment);
    }

    @Override
    public DepartmentDto deleteById(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Department not found")
        );
        departmentRepository.delete(department);
        return DepartmentMapper.maptoDepartmentDto(department);
    }
}

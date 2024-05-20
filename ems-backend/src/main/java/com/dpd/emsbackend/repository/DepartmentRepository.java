package com.dpd.emsbackend.repository;

import com.dpd.emsbackend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}


package com.dpd.emsbackend.repository;

import com.dpd.emsbackend.entity.Employee;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO employees (first_name, last_name, email, department_id) " +
            "VALUES (:firstName, :lastName, :email, :departmentId)", nativeQuery = true)
    void createEmployee(String firstName, String lastName, String email, long departmentId);

    List<Employee> findByIsDeletedFalse();

    boolean existsByEmail(String email);
}

package com.dpd.emsbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean isDeleted;
    private Long departmentId;
}

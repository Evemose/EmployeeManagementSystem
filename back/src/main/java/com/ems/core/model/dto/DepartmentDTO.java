package com.ems.core.model.dto;

import com.ems.core.model.entitites.Department;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class DepartmentDTO {
    private String name;

    private int floor;

    public DepartmentDTO(Department department) {
        this.name = department.getName();
        this.floor = department.getFloor();
    }
}

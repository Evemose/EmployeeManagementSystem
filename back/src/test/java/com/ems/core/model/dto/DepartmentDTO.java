package com.ems.core.model.dto;

import com.ems.core.model.entitites.Department;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@ToString
@NoArgsConstructor
public class DepartmentDTO implements Serializable {

    private long id;

    private String name;

    private int floor;
    
    private List<Long> employeeIds;

}

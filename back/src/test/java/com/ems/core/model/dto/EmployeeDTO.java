package com.ems.core.model.dto;

import com.ems.core.model.enums.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class EmployeeDTO implements Serializable {

    private long id;
    private String name;
    private String surname;
    private short age;
    private Gender gender;
    private String departmentId;
    private String programmingLanguageName;
    private String photo;
}
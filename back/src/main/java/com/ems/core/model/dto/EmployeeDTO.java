package com.ems.core.model.dto;

import com.ems.core.model.entitites.Department;
import com.ems.core.model.entitites.Employee;
import com.ems.core.model.entitites.ProgrammingLanguage;
import com.ems.core.model.enums.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Base64;

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
    private String departmentName;
    private String languageName;
    private String photo;

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.surname = employee.getSurname();
        this.age = employee.getAge();
        this.gender = employee.getGender();
        this.departmentName = employee.getDepartment().getName();
        this.languageName = employee.getLanguage().getName();
        this.photo = employee.getPhoto();
    }
}
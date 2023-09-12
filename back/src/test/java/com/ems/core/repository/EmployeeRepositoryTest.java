package com.ems.core.repository;

import com.ems.core.model.entitites.Employee;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeRepositoryTest {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void testUpdateById() {
        Employee employee = new Employee();
        employee.setAge((short) 18);
        employee.setName("name");
        employee.setSurname("surname");
        employee.setDepartment(null);
        employee.setGender(null);
        employeeRepository.updateById(employee);
        Assertions.assertArrayEquals(new Object[]{employee}, employeeRepository.findAllById(List.of(1L)).toArray());
    }
}

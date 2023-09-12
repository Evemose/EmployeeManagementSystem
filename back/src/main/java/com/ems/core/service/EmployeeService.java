package com.ems.core.service;

import com.ems.core.model.dto.EmployeeDTO;
import com.ems.core.model.entitites.Employee;
import com.ems.core.repository.DepartmentRepository;
import com.ems.core.repository.ProgrammingLanguageRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final DepartmentRepository departmentRepository;
    private final ProgrammingLanguageRepository programmingLanguageRepository;

    public EmployeeService(DepartmentRepository departmentRepository, ProgrammingLanguageRepository programmingLanguageRepository) {
        this.departmentRepository = departmentRepository;
        this.programmingLanguageRepository = programmingLanguageRepository;
    }

    public Employee convertToEmployee(EmployeeDTO employeeDto) {
        Employee employee = new Employee(employeeDto);
        employee.setDepartment(departmentRepository.findByName(employeeDto.getDepartmentName()));
        employee.setLanguage(programmingLanguageRepository.findByName(employeeDto.getLanguageName()));
        return employee;
    }
}

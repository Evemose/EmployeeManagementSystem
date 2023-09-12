package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.dto.EmployeeDTO;
import com.ems.core.model.entitites.Employee;
import com.ems.core.repository.DepartmentRepository;
import com.ems.core.repository.EmployeeRepository;
import com.ems.core.repository.ProgrammingLanguageRepository;
import com.ems.core.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/employees")
public class EmployeeCrudController implements CrudController<Employee, EmployeeDTO>{

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final ProgrammingLanguageRepository programmingLanguageRepository;
    private final EmployeeService employeeService;

    public EmployeeCrudController(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository,
                                  ProgrammingLanguageRepository programmingLanguageRepository, EmployeeService employeeService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.programmingLanguageRepository = programmingLanguageRepository;
        this.employeeService = employeeService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody EmployeeDTO employeeDTO) {
        try {
            employeeRepository.save(employeeService.convertToEmployee(employeeDTO));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody EmployeeDTO employeeDTO) {
        try {
            employeeRepository.save(employeeService.convertToEmployee(employeeDTO));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable long id) {
        try {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid employee id : %d", id)));
            return ResponseEntity.ok(new EmployeeDTO(employee));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(
                    employeeRepository.findAll().stream().map(EmployeeDTO::new).toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        try {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

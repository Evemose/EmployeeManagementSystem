package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.dto.EmployeeDTO;
import com.ems.core.model.entitites.Employee;
import com.ems.core.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/employees")
public class EmployeeCrudController{

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;
    private final CacheManager cacheManager;

    public EmployeeCrudController(EmployeeRepository employeeRepository, ModelMapper modelMapper, CacheManager cacheManager) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.cacheManager = cacheManager;
    }

    @PostMapping("/add")
    @CacheEvict(value = {"employees"}, allEntries = true)
    public ResponseEntity<?> add(@RequestBody EmployeeDTO employeeDTO) {
        try {
            Employee employee = modelMapper.map(employeeDTO, Employee.class);
            employeeRepository.save(employee);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @CacheEvict(value = {"employees"}, allEntries = true)
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody EmployeeDTO employeeDTO) {
        try {
            Assert.isTrue(employeeDTO.getId() == id, "You are trying to update the id of the employee");
            employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid employee id : %d", id)));
            employeeRepository.save(modelMapper.map(employeeDTO, Employee.class));
            Objects.requireNonNull(cacheManager.getCache("employees-single")).evict(employeeDTO.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    @Cacheable(value = "employees-single", key = "#id")
    public ResponseEntity<?> get(@PathVariable long id) {
        try {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid employee id : %d", id)));
            return ResponseEntity.ok(modelMapper.map(employee, EmployeeDTO.class));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    @Cacheable(value = "employees")
    public ResponseEntity<?> getAll(
            @RequestParam(name = "departments", required = false) String departmentNames,
            @RequestParam(name = "programmingLanguages", required = false) String languageNames) {

        Set<String> departmentIdSet = Objects.isNull(departmentNames) ? null :
                new HashSet<>(Arrays.asList(departmentNames.replace("%23", "#").split(",")));
        Set<String> languageNameSet = Objects.isNull(languageNames) ? null :
                new HashSet<>(Arrays.asList(languageNames.replace("%23", "#").split(",")));

        try {
            return ResponseEntity.ok(
                    employeeRepository.findAll().stream()
                            .map(employee -> modelMapper.map(employee, EmployeeDTO.class))
                            .filter(employeeDTO ->
                                    (Objects.isNull(departmentIdSet)
                                            || departmentIdSet.contains(employeeDTO.getDepartmentId()) ) &&
                                            (Objects.isNull(languageNameSet)
                                                    || languageNameSet.contains(employeeDTO.getProgrammingLanguageName())))
                            .toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @CacheEvict(value = {"employees"}, allEntries = true)
    public ResponseEntity<?> delete(@PathVariable long id) {
        try {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

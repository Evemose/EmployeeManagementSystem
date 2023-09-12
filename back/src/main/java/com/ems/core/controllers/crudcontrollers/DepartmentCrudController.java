package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.entitites.Department;
import com.ems.core.repository.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ems.core.model.dto.DepartmentDTO;

@RestController
@RequestMapping("/departments")
public class DepartmentCrudController implements CrudController<Department, DepartmentDTO>{
    private final DepartmentRepository departmentRepository;

    public DepartmentCrudController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public ResponseEntity<?> add(DepartmentDTO department) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(DepartmentDTO department) {
        return null;
    }

    @Override
    public ResponseEntity<?> get(long id) {
        return null;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(
                    departmentRepository.findAll().stream().map(DepartmentDTO::new).toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

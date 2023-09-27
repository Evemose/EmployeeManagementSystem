package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.dto.DepartmentDTO;
import com.ems.core.model.entitites.Department;
import com.ems.core.repository.DepartmentRepository;
import jakarta.websocket.server.PathParam;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/departments")
public class DepartmentCrudController{
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;
    private final ConcurrentMapCacheManager cacheManager;

    public DepartmentCrudController(DepartmentRepository departmentRepository, ModelMapper modelMapper, ConcurrentMapCacheManager cacheManager) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
        this.cacheManager = cacheManager;
    }

    @PostMapping("/add")
    @CacheEvict(value = {"departments"}, allEntries = true)
    public ResponseEntity<?> add(@RequestBody DepartmentDTO department) {
        try {
            departmentRepository.save(modelMapper.map(department, Department.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @CacheEvict(value = {"departments"}, allEntries = true)
    public ResponseEntity<?> update(@PathVariable long id,
                                    @RequestBody DepartmentDTO departmentDTO) {
        try {
            Assert.isTrue(departmentDTO.getId() == id, "You are trying to update the id of the department");
            departmentRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid department id : %d", id)));
            departmentRepository.save(modelMapper.map(departmentDTO, Department.class));
            Objects.requireNonNull(cacheManager.getCache("departments-single")).evict(departmentDTO.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Cacheable(value = "departments-single", key = "#id")
    public ResponseEntity<?> get(@PathVariable long id) {
        try {
            Department department = departmentRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid department id : %d", id)));
            return ResponseEntity.ok(modelMapper.map(department, DepartmentDTO.class));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping
    @Cacheable(value = "departments")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(
                    departmentRepository.findAll().stream()
                            .map(department -> modelMapper.map(department, DepartmentDTO.class))
                            .toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

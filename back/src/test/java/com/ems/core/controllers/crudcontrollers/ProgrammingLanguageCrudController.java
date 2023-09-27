package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.dto.ProgrammingLanguageDTO;
import com.ems.core.model.entitites.ProgrammingLanguage;
import com.ems.core.repository.ProgrammingLanguageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
@RequestMapping("/programming-languages")
public class ProgrammingLanguageCrudController {

    private final ProgrammingLanguageRepository programmingLanguageRepository;
    private final ModelMapper modelMapper;
    private final ConcurrentMapCacheManager cacheManager;

    public ProgrammingLanguageCrudController(ProgrammingLanguageRepository programmingLanguageRepository, ModelMapper modelMapper, ConcurrentMapCacheManager cacheManager) {
        this.programmingLanguageRepository = programmingLanguageRepository;
        this.modelMapper = modelMapper;
        this.cacheManager = cacheManager;
    }

    @PostMapping("/add")
    @CacheEvict(value = {"programmingLanguages"}, allEntries = true)
    public ResponseEntity<?> add(@RequestBody ProgrammingLanguageDTO programmingLanguage) {
        try {
            programmingLanguageRepository.save(modelMapper.map(programmingLanguage, ProgrammingLanguage.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{name}")
    @CacheEvict(value = {"programmingLanguages"}, allEntries = true)
    public ResponseEntity<?> update(@PathVariable String name,
                                    @RequestBody ProgrammingLanguageDTO programmingLanguage) {
        try {
            Assert.isTrue(programmingLanguage.getName().equals(name), "You are trying to update the name of the programming language");
            programmingLanguageRepository.findByName(name)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid programming language name : %s", name)));
            programmingLanguageRepository.save(modelMapper.map(programmingLanguage, ProgrammingLanguage.class));
            Objects.requireNonNull(cacheManager.getCache("programmingLanguages-single")).evict(programmingLanguage.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{name}")
    @Cacheable(value = "programmingLanguages-single", key = "#name")
    public ResponseEntity<?> get(@PathVariable String name) {
        try {
            ProgrammingLanguage programmingLanguage = programmingLanguageRepository.findByName(name)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Invalid programming language name : %s", name)));
            return ResponseEntity.ok(modelMapper.map(programmingLanguage, ProgrammingLanguageDTO.class));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    @Cacheable(value = "programmingLanguages")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(
                    programmingLanguageRepository.findAll().stream()
                            .map(programmingLanguage -> modelMapper.map(programmingLanguage, ProgrammingLanguageDTO.class))
                            .toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.entitites.ProgrammingLanguage;
import com.ems.core.repository.ProgrammingLanguageRepository;
import org.springframework.http.ResponseEntity;
import com.ems.core.model.dto.ProgrammingLanguageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/programmingLanguages")
public class ProgrammingLanguageCrudController implements CrudController<ProgrammingLanguage, ProgrammingLanguageDTO>{

    private final ProgrammingLanguageRepository programmingLanguageRepository;

    public ProgrammingLanguageCrudController(ProgrammingLanguageRepository programmingLanguageRepository) {
        this.programmingLanguageRepository = programmingLanguageRepository;
    }

    @Override
    public ResponseEntity<?> add(ProgrammingLanguageDTO programmingLanguage) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(ProgrammingLanguageDTO programmingLanguage) {
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
                    programmingLanguageRepository.findAll().stream().map(ProgrammingLanguageDTO::new).toArray());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

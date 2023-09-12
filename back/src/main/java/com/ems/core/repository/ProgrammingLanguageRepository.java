package com.ems.core.repository;

import com.ems.core.model.entitites.ProgrammingLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgrammingLanguageRepository extends JpaRepository<ProgrammingLanguage, Long> {
    ProgrammingLanguage findByName(String name);
}

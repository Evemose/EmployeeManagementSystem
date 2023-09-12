package com.ems.core.model.dto;

import com.ems.core.model.entitites.ProgrammingLanguage;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ProgrammingLanguageDTO implements Serializable {

    private String name;

    public ProgrammingLanguageDTO(ProgrammingLanguage programmingLanguage) {
        this.name = programmingLanguage.getName();
    }
}
package com.ems.core.model.dto;

import com.ems.core.model.entitites.ProgrammingLanguage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProgrammingLanguageDTO implements Serializable {

    private String id;

    private String name;

    private List<Long> employeeIds;
}
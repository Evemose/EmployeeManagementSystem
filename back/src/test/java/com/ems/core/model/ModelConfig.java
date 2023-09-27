package com.ems.core.model;

import com.ems.core.model.dto.DepartmentDTO;
import com.ems.core.model.dto.ProgrammingLanguageDTO;
import com.ems.core.model.entitites.Department;
import com.ems.core.model.entitites.Employee;
import com.ems.core.model.entitites.ProgrammingLanguage;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ModelConfig {

    @Bean
    public ModelMapper modelMapper() {

        ModelMapper modelMapper = new ModelMapper();

        modelMapper.typeMap(Department.class, DepartmentDTO.class)
                .addMappings(mapper ->
                        mapper.using(getEmployeesListToEmployeeIdsConverter())
                        .map(Department::getEmployees, DepartmentDTO::setEmployeeIds));

        modelMapper.typeMap(ProgrammingLanguage.class, ProgrammingLanguageDTO.class)
                .addMappings(mapper -> mapper.using(getEmployeesListToEmployeeIdsConverter())
                        .map(ProgrammingLanguage::getEmployees, ProgrammingLanguageDTO::setEmployeeIds));

        modelMapper.typeMap(ProgrammingLanguage.class, ProgrammingLanguageDTO.class)
                .addMappings(mapper -> mapper.using(MappingContext::getSource)
                        .map(ProgrammingLanguage::getName, ProgrammingLanguageDTO::setId));

        return modelMapper;
    }

    private static Converter<List<Employee>, List<Long>> getEmployeesListToEmployeeIdsConverter() {
        return ctx -> (ctx.getSource())
                .stream()
                .map(Employee::getId)
                .toList();
    }
}

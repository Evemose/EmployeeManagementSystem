package com.ems.core.controllers.crudcontrollers;

import com.ems.core.model.dto.DTO;
import org.springframework.http.ResponseEntity;

public interface CrudController<T, D> {
    ResponseEntity<?> add(D t);

    ResponseEntity<?> update (D t);

    ResponseEntity<?> get(long id);

    ResponseEntity<?> getAll();
}

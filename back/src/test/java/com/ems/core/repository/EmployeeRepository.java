package com.ems.core.repository;

import com.ems.core.model.entitites.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Transactional
    @Modifying
    @Query("""
            update Employee e set e.name = ?1, e.surname = ?2, e.age = ?3, e.gender = ?4, e.department = ?5
            where e.id = ?6""")
    void updateById(Employee employee);
}
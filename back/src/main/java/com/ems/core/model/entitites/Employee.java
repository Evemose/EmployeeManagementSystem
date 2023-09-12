package com.ems.core.model.entitites;

import com.ems.core.model.dto.EmployeeDTO;
import com.ems.core.model.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Table(name = "employees")
@NoArgsConstructor
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Length(min = 1)
    private String name;

    @NotNull
    @Length(min = 1)
    private String surname;

    @NotNull
    @Min(18)
    private short age;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(length = 1000000)
    private String photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    @ToString.Exclude
    @NotNull
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lang_id")
    @ToString.Exclude
    @NotNull
    private ProgrammingLanguage language;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Employee employee = (Employee) o;
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

    public Employee(String name, String surname, short age, Gender gender, String photo) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.gender = gender;
        this.photo = photo;
    }

    public Employee(EmployeeDTO employeeDTO) {
        this.id = employeeDTO.getId();
        this.name = employeeDTO.getName();
        this.surname = employeeDTO.getSurname();
        this.age = employeeDTO.getAge();
        this.photo = employeeDTO.getPhoto();
        this.gender = employeeDTO.getGender();
    }
}

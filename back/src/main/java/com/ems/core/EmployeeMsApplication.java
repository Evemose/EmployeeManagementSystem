package com.ems.core;

import com.ems.core.controllers.WebSecurityController;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
public class EmployeeMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeMsApplication.class, args);
    }

}

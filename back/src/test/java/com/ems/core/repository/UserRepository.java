package com.ems.core.repository;

import com.ems.core.model.entitites.security.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    List<User> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1, u.role = ?2, u.username = ?3 where u.username = ?4")
    void updateByUsername(User user);


}
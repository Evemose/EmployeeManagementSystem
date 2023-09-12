package com.ems.core.security;

import com.ems.core.security.filters.JWTAuthFilter;
import com.ems.core.security.filters.JWTGeneratorFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {
    private final JWTGeneratorFilter JWTGeneratorFilter;
    private final com.ems.core.security.filters.JWTAuthFilter JWTAuthFilter;

    public SecurityConfig(JWTGeneratorFilter JWTGeneratorFilter, JWTAuthFilter JWTAuthFilter) {
        this.JWTGeneratorFilter = JWTGeneratorFilter;
        this.JWTAuthFilter = JWTAuthFilter;
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(getCorsConfigurerCustomizer())
                .addFilterAfter(JWTGeneratorFilter, BasicAuthenticationFilter.class)
                .addFilterAfter(JWTAuthFilter, BasicAuthenticationFilter.class)
                .authorizeHttpRequests(requests ->
                        requests.requestMatchers("/home").authenticated()
                                .requestMatchers("/authorize", "/register").permitAll()
                                .requestMatchers("/employees/**").permitAll()
                                .requestMatchers("/departments/**").permitAll()
                                .requestMatchers("/programmingLanguages/**").permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout"))
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(withDefaults());
        return http.build();
    }

    private static Customizer<CorsConfigurer<HttpSecurity>> getCorsConfigurerCustomizer() {
        return cors ->
                cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.addAllowedOrigin("*");
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfiguration.addAllowedHeader("Access-Control-Allow-Origin");
                    corsConfiguration.addAllowedHeader("Content-Type");
                    corsConfiguration.addAllowedHeader("Authorization");
                    corsConfiguration.addExposedHeader("Authorization");
                    corsConfiguration.addExposedHeader("Access-Control-Allow-Origin");
                    return corsConfiguration;
                });
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

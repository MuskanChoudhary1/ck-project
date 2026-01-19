package com.cloudbalance.cloudbalance_backend.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.datasource.url}")
    private String url;

    @Value("${snowflake.datasource.username}")
    private String username;

    @Value("${snowflake.datasource.password}")
    private String password;

    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");

        // Prevent Hibernate from using this datasource
        config.setAutoCommit(true);
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(0);
        config.setInitializationFailTimeout(-1); // Don't fail if can't connect immediately
        return new HikariDataSource(config);
    }

    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(
            @Qualifier("snowflakeDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}


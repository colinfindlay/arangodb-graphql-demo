package com.colinfindlay.avobank.graphql.config;

import com.arangodb.ArangoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArangoConfig {

    private final ArangoConfigurationProperties properties;

    @Autowired
    public ArangoConfig(ArangoConfigurationProperties properties) {
        this.properties = properties;
    }

    @Bean
    public ArangoDB arangoDB(){
        return new ArangoDB.Builder().host(properties.getHost(), properties.getPort())
                .user(properties.getUser())
                .password(properties.getPassword())
                .build();
    }


}

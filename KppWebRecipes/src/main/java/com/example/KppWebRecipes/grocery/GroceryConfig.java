package com.example.KppWebRecipes.grocery;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.List;

@Configuration
@Order(1)
public class GroceryConfig {

    @Bean
    CommandLineRunner commandLineRunner(GroceryRepository repository) {
        return args -> {
            Grocery groc1 = new Grocery(1L, "Potato", "");
            Grocery groc2 = new Grocery(2L, "Raspberry", "");

            repository.saveAll(List.of(groc1, groc2));
        };
    }
}

//package com.example.KppWebRecipes.recipe;
//
//import com.example.KppWebRecipes.grocery.Grocery;
//import com.example.KppWebRecipes.grocery.GroceryRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//
//import java.util.List;
//
//@Configuration
//@Order(2)
//public class RecipeConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunner1(RecipeRepository recipeRepository, GroceryRepository groceryRepository) {
//        return args -> {
//            List<Grocery> groceries = groceryRepository.findAll();
//            Recipe recipe = new Recipe(
//                    1L,
//                    "Potato mixed with raspberry",
//                    "mix potato with raspberry",
//                    "some description",
//                    "",
//                    groceries);
//            recipeRepository.save(recipe);
//        };
//    }
//}

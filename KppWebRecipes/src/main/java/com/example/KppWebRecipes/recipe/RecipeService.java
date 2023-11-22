package com.example.KppWebRecipes.recipe;

import com.example.KppWebRecipes.grocery.Grocery;
import com.example.KppWebRecipes.grocery.GroceryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final GroceryRepository groceryRepository;

    @Autowired
    public RecipeService(
            RecipeRepository recipeRepository,
            GroceryRepository groceryRepository) {
        this.recipeRepository = recipeRepository;
        this.groceryRepository = groceryRepository;
    }


    public List<Recipe> getRecipes() {
        // TODO: (1) allow name filtering
        return recipeRepository.findAll();
    }

    public Recipe addRecipe(
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<Long> groceryIds) {
        List<Grocery> groceries = groceryRepository.findAllById(groceryIds);
        Recipe recipeObj =
                new Recipe(name, recipe, description, photoUrl, groceries);
        return recipeRepository.save(recipeObj);
    }

    public void deleteRecipe(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }

    @Transactional
    public Recipe updateRecipe(
            Long recipeId,
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<Long> groceryIds) {
        Recipe recipeObj = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalStateException(
                        "no recipe with id " + recipeId + " exists"));

        if (name != null &&
                !name.isEmpty() &&
                !Objects.equals(recipeObj.getName(), name)) {
            // TODO: (1) add error handling here
            recipeObj.setName(name);
        }

        if (recipe != null &&
                !Objects.equals(recipeObj.getRecipe(), recipe)) {
            recipeObj.setRecipe(recipe);
        }

        if (description != null &&
                !Objects.equals(recipeObj.getDescription(), description)) {
            recipeObj.setDescription(description);
        }

        if (photoUrl != null &&
                !Objects.equals(recipeObj.getPhotoUrl(), photoUrl)) {
            recipeObj.setPhotoUrl(photoUrl);
        }

        if (groceryIds != null) {
            List<Grocery> groceries = groceryRepository.findAllById(groceryIds);
            recipeObj.setGroceries(groceries);
        }

        return recipeObj;
    }
}

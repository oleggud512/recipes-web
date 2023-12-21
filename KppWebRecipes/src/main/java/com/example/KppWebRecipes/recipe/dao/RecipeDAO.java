package com.example.KppWebRecipes.recipe.dao;

import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;

import java.util.List;

public interface RecipeDAO {
    List<Recipe> getRecipes(String name) throws Exception;
    Recipe getRecipeById(Long id) throws Exception;

    Recipe addRecipe(
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries) throws Exception;

    Recipe updateRecipe(
            Long recipeId,
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries) throws Exception;

    void deleteRecipe(Long recipeId) throws Exception;
}

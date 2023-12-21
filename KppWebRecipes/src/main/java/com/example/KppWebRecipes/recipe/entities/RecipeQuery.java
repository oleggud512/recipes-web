package com.example.KppWebRecipes.recipe.entities;

import java.util.List;

public record RecipeQuery(
        String name,
        String recipe,
        String description,
        String photoUrl,
        List<RecipeGrocery> groceries) {
}

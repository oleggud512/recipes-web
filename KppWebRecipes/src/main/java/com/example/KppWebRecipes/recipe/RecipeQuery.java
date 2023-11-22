package com.example.KppWebRecipes.recipe;

import java.util.List;

public record RecipeQuery(
        String name,
        String recipe,
        String description,
        String photoUrl,
        List<Long> groceryIds) {
}

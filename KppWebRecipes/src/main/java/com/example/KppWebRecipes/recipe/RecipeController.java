package com.example.KppWebRecipes.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @GetMapping
    public List<Recipe> getRecipes() {
        return recipeService.getRecipes();
    }

    @PostMapping
    public Recipe addNewRecipe(@RequestBody RecipeQuery recipeArgs) {
        return recipeService.addRecipe(
                recipeArgs.name(),
                recipeArgs.recipe(),
                recipeArgs.description(),
                recipeArgs.photoUrl(),
                recipeArgs.groceryIds());
    }

    @DeleteMapping(path = "{recipeId}")
    public void deleteRecipe(@PathVariable("recipeId") Long recipeId) {
        recipeService.deleteRecipe(recipeId);
    }

    @PutMapping(path = "{recipeId}")
    public Recipe updateRecipe(
            @PathVariable("recipeId") Long recipeId,
            @RequestBody RecipeQuery recipeArgs) {
        return recipeService.updateRecipe(
                recipeId,
                recipeArgs.name(),
                recipeArgs.recipe(),
                recipeArgs.description(),
                recipeArgs.photoUrl(),
                recipeArgs.groceryIds());
    }
}

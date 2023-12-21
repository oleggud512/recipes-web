package com.example.KppWebRecipes.recipe;

import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeQuery;
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
    public List<Recipe> getRecipes(@RequestParam(required = false) String name) throws Exception {
        return recipeService.getRecipes(name);
    }

    @PostMapping
    public Recipe addNewRecipe(@RequestBody RecipeQuery recipeArgs) throws Exception {
        return recipeService.addRecipe(
                recipeArgs.name(),
                recipeArgs.recipe(),
                recipeArgs.description(),
                recipeArgs.photoUrl(),
                recipeArgs.groceries());
    }

    @GetMapping(path = "{recipeId}")
    public Recipe getRecipe(@PathVariable("recipeId") Long recipeId) throws Exception {
        return recipeService.getRecipeById(recipeId);
    }

    @DeleteMapping(path = "{recipeId}")
    public void deleteRecipe(@PathVariable("recipeId") Long recipeId) throws Exception {
        recipeService.deleteRecipe(recipeId);
    }

    @PutMapping(path = "{recipeId}")
    public Recipe updateRecipe(
            @PathVariable("recipeId") Long recipeId,
            @RequestBody RecipeQuery recipeArgs) throws Exception {
        return recipeService.updateRecipe(
                recipeId,
                recipeArgs.name(),
                recipeArgs.recipe(),
                recipeArgs.description(),
                recipeArgs.photoUrl(),
                recipeArgs.groceries());
    }
}

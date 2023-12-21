package com.example.KppWebRecipes.recipe.entities;

import java.util.ArrayList;
import java.util.List;

public class Recipe {
    private Long id;
    private String name;
    private String recipe;
    private String description;
    private String photoUrl;
    private List<RecipeGrocery> groceries;

    public Recipe() {
    }

    public Recipe(String name, String recipe, String description, String photoUrl, List<RecipeGrocery> groceries) {
        this.name = name;
        this.recipe = recipe;
        this.description = description;
        this.photoUrl = photoUrl;
        this.groceries = groceries;
    }

    public Recipe(Long id, String name, String recipe, String description, String photoUrl) {
        this.id = id;
        this.name = name;
        this.recipe = recipe;
        this.description = description;
        this.photoUrl = photoUrl;
        this.groceries = new ArrayList<RecipeGrocery>();
    }

    public Recipe(Long id, String name, String recipe, String description, String photoUrl, List<RecipeGrocery> groceries) {
        this.id = id;
        this.name = name;
        this.recipe = recipe;
        this.description = description;
        this.photoUrl = photoUrl;
        this.groceries = groceries;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public List<RecipeGrocery> getGroceries() {
        return groceries;
    }

    public void setGroceries(List<RecipeGrocery> groceries) {
        this.groceries = groceries;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", recipe='" + recipe + '\'' +
                ", description='" + description + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                ", groceries=" + groceries +
                '}';
    }
}

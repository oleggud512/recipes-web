package com.example.KppWebRecipes.recipe;

import com.example.KppWebRecipes.grocery.Grocery;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Recipe {
    @Id
    @SequenceGenerator(
            name = "recipe_sequence",
            sequenceName = "recipe_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "recipe_sequence"
    )
    private Long id;
    private String name;
    private String recipe;
    private String description;
    private String photoUrl;

    @ManyToMany
    @JoinTable(
            name = "recipe_grocery",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "grocery_id")
    )
    private List<Grocery> groceries;

    public Recipe() {
    }

    public Recipe(String name, String recipe, String description, String photoUrl, List<Grocery> groceries) {
        this.name = name;
        this.recipe = recipe;
        this.description = description;
        this.photoUrl = photoUrl;
        this.groceries = groceries;
    }

    public Recipe(Long id, String name, String recipe, String description, String photoUrl, List<Grocery> groceries) {
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

    public List<Grocery> getGroceries() {
        return groceries;
    }

    public void setGroceries(List<Grocery> groceries) {
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

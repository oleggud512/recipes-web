package com.example.KppWebRecipes.recipe.entities;

import com.example.KppWebRecipes.grocery.etities.Grocery;

public class RecipeGrocery extends Grocery {
    private double amount;

    public RecipeGrocery() {
    }

    public RecipeGrocery(Long id, String name, String photoUrl, double amount) {
        super(id, name, photoUrl);
        this.amount = amount;
    }

    public RecipeGrocery(Long id, double amount) {
        super(id);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

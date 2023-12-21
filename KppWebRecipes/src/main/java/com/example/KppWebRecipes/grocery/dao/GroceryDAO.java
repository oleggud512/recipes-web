package com.example.KppWebRecipes.grocery.dao;

import com.example.KppWebRecipes.grocery.etities.Grocery;

import java.util.List;

public interface GroceryDAO {
    List<Grocery> getGroceriesByName(String name) throws Exception;

    Grocery addNewGrocery(String name, String photoUrl) throws Exception;

    Grocery updateGrocery(GroceryUpdateCommand data) throws Exception;

    void deleteGrocery(Long groceryId) throws Exception;
}

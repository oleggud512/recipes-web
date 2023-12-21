package com.example.KppWebRecipes.recipe.dao;

import com.example.KppWebRecipes.DbUtils;
import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RecipeDAOMySQLImpl implements RecipeDAO {
    Connection con;

    public RecipeDAOMySQLImpl(Connection con) {
        this.con = con;
    }

    @Override
    public List<Recipe> getRecipes(String name) throws Exception {
        System.out.println("getRecipes("+name+")");
        try (PreparedStatement ps = con.prepareStatement("""
            SELECT
                r.recipeId,
                r.recipeName,
                r.recipeDescription,
                r.recipeRecipe,
                r.recipePhotoUrl,
                
                g.groceryId,
                g.groceryName,
                g.groceryPhotoUrl,
                
                rg.groceryAmount
            FROM recipes r
                JOIN recipe_groceries rg
                ON r.recipeId = rg.recipeId
                JOIN groceries g
                ON rg.groceryId = g.groceryId
            WHERE r.recipeName LIKE CONCAT('%', ?, '%')
        """)) {

            ps.setString(1, name);

            List<Recipe> recipes = new ArrayList<Recipe>();

            try (ResultSet res = ps.executeQuery()) {

                Map<Long, Recipe> recipeMap = new HashMap<Long, Recipe>();

                while (res.next()) {
                    Long recipeId = res.getLong(DbUtils.recipeId);
                    Recipe recipe = recipeMap.get(recipeId);

                    if (recipe == null) {
                        recipe = DbUtils.resultSetToRecipe(res);
                        recipeMap.put(recipeId, recipe);
                        recipes.add(recipe);
                    }

                    RecipeGrocery grocery = DbUtils.resultSetToRecipeGrocery(res);
                    recipe.getGroceries().add(grocery);
                }
            }

            return recipes;
        }
    }

    @Override
    public Recipe addRecipe(
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries
    ) throws Exception {
        long newRecipeId;

        try (PreparedStatement ps = con.prepareStatement(
            """
                    INSERT INTO recipes(
                        recipeName,
                        recipeRecipe,
                        recipeDescription,
                        recipePhotoUrl)
                    VALUE (?, ?, ?, ?)
                """,
                Statement.RETURN_GENERATED_KEYS
        )) {
            ps.setString(1, name);
            ps.setString(2, recipe);
            ps.setString(3, description);
            ps.setString(4, photoUrl);

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated == 0) {
                throw new SQLException("Failed to add recipe");
            }

            try (ResultSet res = ps.getGeneratedKeys()) {
                if (!res.next()) {
                    throw new SQLException("Failed to add recipe, unable to get recipeId");
                }

                newRecipeId = res.getLong(1);
            }
        }

        try (PreparedStatement ps = con.prepareStatement("""
            INSERT INTO recipe_groceries(recipeId, groceryId, groceryAmount)
            VALUE (?, ?, ?)
        """)) {
            int i = 0;
            for (RecipeGrocery grocery : groceries) {
                ps.setLong(1, newRecipeId);
                ps.setLong(2, grocery.getId());
                ps.setDouble(3, grocery.getAmount());

                ps.addBatch();

                i++;
                if (i % 1000 == 0 || i == groceries.size()) {
                    ps.executeBatch();
                }
            }
        }

        return getRecipeById(newRecipeId);
    }

    @Override
    public Recipe getRecipeById(Long recipeId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement("""
            SELECT r.recipeId,
                r.recipeName,
                r.recipeRecipe,
                r.recipeDescription,
                r.recipePhotoUrl,
                
                g.groceryId,
                g.groceryName,
                g.groceryPhotoUrl,
                
                rg.groceryAmount
            FROM recipes r
                JOIN recipe_groceries rg
                ON r.recipeId = rg.recipeId
                JOIN groceries g
                ON rg.groceryId = g.groceryId
            WHERE r.recipeId = ?
        """)) {
            ps.setLong(1, recipeId);

            Recipe newRecipe = null;
            try (ResultSet res = ps.executeQuery()) {
                while (res.next()) {
                    if (newRecipe == null) {
                        newRecipe = DbUtils.resultSetToRecipe(res);
                    }
                    RecipeGrocery grocery = DbUtils.resultSetToRecipeGrocery(res);
                    newRecipe.getGroceries().add(grocery);
                }
            }

            return newRecipe;
        }
    }

    @Override
    public Recipe updateRecipe(
            Long recipeId,
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries) throws Exception {
        try (PreparedStatement ps = con.prepareStatement("""
            UPDATE recipes
            SET recipeName = IFNULL(?, recipeName),
                recipeRecipe = IFNULL(?, recipeRecipe),
                recipeDescription = IFNULL(?, recipeDescription),
                recipePhotoUrl = ?
            WHERE recipeId = ?
        """)) {
            ps.setString(1, name);
            ps.setString(2, recipe);
            ps.setString(3, description);
            ps.setString(4, photoUrl);
            ps.setLong(5, recipeId);

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated == 0) {
                throw new SQLException("Failed to update recipe with id " + recipeId);
            }
        }

        try (PreparedStatement ps = con.prepareStatement("""
            DELETE FROM recipe_groceries
            WHERE recipeId = ?
        """)) {
            ps.setLong(1, recipeId);
            ps.executeUpdate();
        }

        try (PreparedStatement ps = con.prepareStatement("""
            INSERT INTO recipe_groceries (recipeId, groceryId, groceryAmount)
            VALUES (?, ?, ?)
        """)) {
            for (RecipeGrocery grocery : groceries) {
                ps.setLong(1, recipeId);
                ps.setLong(2, grocery.getId());
                ps.setDouble(3, grocery.getAmount());
                ps.addBatch();
            }
            ps.executeBatch();
        }

        return getRecipeById(recipeId);
    }

    @Override
    public void deleteRecipe(Long recipeId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement("""
            DELETE FROM recipe_groceries
            WHERE recipeId = ?
        """)) {
            ps.setLong(1, recipeId);
            ps.executeUpdate();
        }

        // Delete the recipe record from the recipes table
        try (PreparedStatement ps = con.prepareStatement("""
            DELETE FROM recipes
            WHERE recipeId = ?
        """)) {
            ps.setLong(1, recipeId);

            int rowsDeleted = ps.executeUpdate();

            if (rowsDeleted == 0) {
                System.out.println("Recipe with ID " + recipeId + " not found.");
            }
        }
    }
}

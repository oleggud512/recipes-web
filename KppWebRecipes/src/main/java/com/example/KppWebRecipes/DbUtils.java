package com.example.KppWebRecipes;

import com.example.KppWebRecipes.grocery.etities.Grocery;
import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;

import java.sql.*;

public class DbUtils {

    private static final String dropRecipeGroceriesStatement = "DROP TABLE IF EXISTS recipe_groceries;";
    private static final String dropGroceriesStatement = "DROP TABLE IF EXISTS groceries";
    private static final String dropRecipesStatement = "DROP TABLE IF EXISTS recipes";
    private static final String createRecipesStatement = """
        CREATE TABLE recipes (
            recipeId INT PRIMARY KEY AUTO_INCREMENT,
            recipeName VARCHAR(50) NOT NULL DEFAULT(""),
            recipeRecipe TEXT NOT NULL DEFAULT(""),
            recipeDescription TEXT NOT NULL DEFAULT(""),
            recipePhotoUrl TEXT
        );
        """;
    private static final String createGroceriesStatement = """
        CREATE TABLE groceries (
            groceryId INT PRIMARY KEY AUTO_INCREMENT,
            groceryName VARCHAR(50) NOT NULL DEFAULT(""),
            groceryPhotoUrl TEXT
        );
        """;
    private static final String createRecipeGroceriesStatement = """
        CREATE TABLE recipe_groceries (
            recipeId INT NOT NULL,
            groceryId INT NOT NULL,
            groceryAmount DECIMAL(10,2) NOT NULL DEFAULT(0.0),
            PRIMARY KEY (recipeId, groceryId),
            CONSTRAINT recipeIdFk
                FOREIGN KEY (recipeId)
                REFERENCES recipes(recipeId),
            CONSTRAINT groceryIdFk
                FOREIGN KEY (groceryId)
                REFERENCES groceries(groceryId)
        );
        """;
    private static final String createImagesStatement = """
            CREATE TABLE images (
                imageId VARCHAR(256) PRIMARY KEY,
                imageType VARCHAR(256) NOT NULL,
                imageData LONGBLOB NOT NULL
            );
            """;
    private static final String dropImagesStatement = "DROP TABLE IF EXISTS images";

    public static final String recipeId = "recipeId";
    public static final String recipeName = "recipeName";
    public static final String recipeRecipe = "recipeRecipe";
    public static final String recipeDescription = "recipeDescription";
    public static final String recipePhotoUrl = "recipePhotoUrl";
    public static final String groceryId = "groceryId";
    public static final String groceryName = "groceryName";
    public static final String groceryPhotoUrl = "groceryPhotoUrl";
    public static final String groceryAmount = "groceryAmount";

    public static void dropTables(Connection con) throws Exception {
        System.out.println("Drop tables...");
        Statement st = con.createStatement();
        st.addBatch(dropRecipeGroceriesStatement);
        st.addBatch(dropRecipesStatement);
        st.addBatch(dropGroceriesStatement);
        st.addBatch(dropImagesStatement);
        st.executeBatch();
    }

    public static void createTables(Connection con) throws Exception {
        System.out.println("Creating database...");
        Statement st = con.createStatement();
        st.addBatch(createRecipesStatement);
        st.addBatch(createGroceriesStatement);
        st.addBatch(createRecipeGroceriesStatement);
        st.addBatch(createImagesStatement);
        st.executeBatch();
    }

    // TODO: move this somewhere
    public static Grocery resultSetToGrocery(ResultSet res) throws Exception {
        return new Grocery(
                res.getLong(DbUtils.groceryId),
                res.getString(DbUtils.groceryName),
                res.getString(DbUtils.groceryPhotoUrl)
        );
    }

    public static RecipeGrocery resultSetToRecipeGrocery(ResultSet res) throws Exception {
        return new RecipeGrocery(
                res.getLong(DbUtils.groceryId),
                res.getString(DbUtils.groceryName),
                res.getString(DbUtils.groceryPhotoUrl),
                res.getDouble(DbUtils.groceryAmount)
        );
    }

    public static Recipe resultSetToRecipe(ResultSet res) throws Exception {
        return new Recipe(
                res.getLong(DbUtils.recipeId),
                res.getString(DbUtils.recipeName),
                res.getString(DbUtils.recipeRecipe),
                res.getString(DbUtils.recipeDescription),
                res.getString(DbUtils.recipePhotoUrl)
        );
    }
}

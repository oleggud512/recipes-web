package com.example.KppWebRecipes;

import com.example.KppWebRecipes.grocery.etities.Grocery;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOFactory;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOType;
import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

    public static Recipe fillTables(
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries
    ) throws Exception {
        Connection con = Connector.getDefaultConnection();

        long newRecipeId;
        List<RecipeGrocery> actualGroceries = new ArrayList<RecipeGrocery>();

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

        try (PreparedStatement selectPs = con.prepareStatement("SELECT groceryId FROM groceries WHERE groceryName = ?");
            PreparedStatement insertPs = con.prepareStatement("INSERT INTO groceries(groceryName) VALUE (?)", Statement.RETURN_GENERATED_KEYS)) {

            for (RecipeGrocery grocery : groceries) {
                selectPs.setString(1, grocery.getName());

                try (ResultSet res = selectPs.executeQuery()) {
                    if (res.next()) {
                        actualGroceries.add(
                                new RecipeGrocery(
                                        res.getLong(DbUtils.groceryId),
                                        grocery.getName(),
                                        grocery.getPhotoUrl(),
                                        grocery.getAmount()
                                )
                        );

                        continue;
                    }
                }

                insertPs.setString(1, grocery.getName());
                insertPs.executeUpdate();

                try (ResultSet keys = insertPs.getGeneratedKeys()) {
                    if (keys.next()) {
                        actualGroceries.add(
                                new RecipeGrocery(
                                        keys.getLong(1),
                                        grocery.getName(),
                                        grocery.getPhotoUrl(),
                                        grocery.getAmount()
                                )
                        );
                    }
                }
            }
        }

        try (PreparedStatement ps = con.prepareStatement("""
            INSERT INTO recipe_groceries(recipeId, groceryId, groceryAmount)
            VALUE (?, ?, ?)
        """)) {
            int i = 0;
            for (RecipeGrocery grocery : actualGroceries) {
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

        return RecipeDAOFactory.getDao(RecipeDAOType.MySQL).getRecipeById(newRecipeId);
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

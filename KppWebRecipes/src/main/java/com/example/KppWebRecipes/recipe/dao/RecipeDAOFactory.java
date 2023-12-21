package com.example.KppWebRecipes.recipe.dao;

import com.example.KppWebRecipes.Connector;

import java.sql.SQLException;

public class RecipeDAOFactory {

    private static RecipeDAO dao;

    public static RecipeDAO getDao(RecipeDAOType type) throws SQLException {
        if (type == RecipeDAOType.MySQL) {
            dao = new RecipeDAOMySQLImpl(Connector.getDefaultConnection());
        }
        return dao;
    }
}

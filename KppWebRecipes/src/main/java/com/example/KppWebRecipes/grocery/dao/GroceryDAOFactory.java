package com.example.KppWebRecipes.grocery.dao;

import com.example.KppWebRecipes.Connector;

import java.sql.SQLException;

public class GroceryDAOFactory {
    private static GroceryDAO dao;
    public static GroceryDAO getDao(GroceryDAOType type) throws SQLException {
        if (type == GroceryDAOType.MySQL) {
            dao = new GroceryDAOMySQLImpl(Connector.getDefaultConnection());
        }
        return dao;
    }
}

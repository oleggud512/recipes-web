package com.example.KppWebRecipes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class Connector {
    private static final String dbUser = "recipes_user";
    private static final String dbPassword = "asdfasdf";
    private static String dbUrl = "jdbc:mysql://localhost:3306/recipes";
    private static Connection con = null;

    public static Connection getDefaultConnection() throws SQLException {
        if (con == null) {
            Properties connInfo = new Properties();
            connInfo.put("user", dbUser);
            connInfo.put("password", dbPassword);
            connInfo.put("useUnicode", "true");
            connInfo.put("characterEncoding", "utf-8");
            return DriverManager.getConnection(dbUrl, connInfo);
        }
        return con;
    }
}
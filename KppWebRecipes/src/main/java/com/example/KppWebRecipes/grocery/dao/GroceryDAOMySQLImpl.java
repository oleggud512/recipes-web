package com.example.KppWebRecipes.grocery.dao;

import com.example.KppWebRecipes.DbUtils;
import com.example.KppWebRecipes.grocery.etities.Grocery;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class GroceryDAOMySQLImpl implements GroceryDAO {
    private final Connection con;

    public GroceryDAOMySQLImpl(Connection con) {
        this.con = con;
    }

    @Override
    public List<Grocery> getGroceriesByName(String name) throws Exception {
        System.out.println("getGroceries("+name+")");

        try (PreparedStatement ps = con.prepareStatement("""
            SELECT groceryId, groceryName, groceryPhotoUrl
            FROM groceries
            WHERE groceryName LIKE CONCAT('%', ?, '%')
        """)) {
            ps.setString(1, name);
            ResultSet res = ps.executeQuery();
            List<Grocery> groceries = new ArrayList<Grocery>();

            while (res.next()) {
                Grocery grocery = DbUtils.resultSetToGrocery(res);
                groceries.add(grocery);
            }

            return groceries;
        }
    }

    @Override
    public Grocery addNewGrocery(String name, String photoUrl) throws Exception {
        System.out.println("addNewGrocery("+name+","+photoUrl+")");

        long newGroceryId;

        try (PreparedStatement ps = con.prepareStatement(
            "INSERT INTO groceries(groceryName, groceryPhotoUrl) VALUE (?, ?)",
            Statement.RETURN_GENERATED_KEYS
        )) {
            ps.setString(1, name);
            ps.setString(2, photoUrl);

            int updatedRows = ps.executeUpdate();

            if (updatedRows == 0) {
                throw new SQLException("Creating grocery failed, no rows affected.");
            }

            try (ResultSet res = ps.getGeneratedKeys()) {

                if (!res.next()) {
                    throw new SQLException("Creating grocery failed, no ID obtained.");
                }

                newGroceryId = res.getLong(1);
            }
        }

        return getGroceryById(newGroceryId);
    }

    private Grocery getGroceryById(Long groceryId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement("""
            SELECT groceryId, groceryName, groceryPhotoUrl
            FROM groceries
            WHERE groceryId = ?
        """)) {
            ps.setLong(1, groceryId);
            ResultSet res = ps.executeQuery();

            if (!res.next()) {
                throw new SQLException("Failed to get grocery with id " + groceryId);
            }

            return DbUtils.resultSetToGrocery(res);
        }
    }

    @Override
    public Grocery updateGrocery(GroceryUpdateCommand data) throws Exception {
        System.out.println("addNewGrocery("+data.getId()+","+data.getName()+","+data.getPhotoUrl()+")");

        try (PreparedStatement ps = con.prepareStatement("""
            UPDATE groceries
            SET groceryName = IFNULL(?, groceryName),
                groceryPhotoUrl = ?
            WHERE groceryId = ?
        """)) {
            ps.setString(1, data.getName());
            ps.setString(2, data.getPhotoUrl());
            ps.setLong(3, data.getId());

            int updatedRows = ps.executeUpdate();

            if (updatedRows == 0) {
                throw new SQLException("Failed to update grocery with id " + data.getId());
            }
        }

        return getGroceryById(data.getId());
    }

    @Override
    public void deleteGrocery(Long groceryId) throws Exception {
        System.out.println("deleteGrocery("+groceryId+")");

        try (PreparedStatement ps = con.prepareStatement("""
            DELETE FROM groceries WHERE groceryId = ?
        """)) {
            ps.setLong(1, groceryId);

            int updatedRows = ps.executeUpdate();

            if (updatedRows == 0) {
                throw new SQLException("Failed to delete grocery with id " + groceryId);
            }
        }
    }
}

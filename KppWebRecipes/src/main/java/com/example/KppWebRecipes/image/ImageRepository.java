package com.example.KppWebRecipes.image;

import com.example.KppWebRecipes.Connector;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Repository
public class ImageRepository {
    private Connection con;

    ImageRepository() throws Exception {
        con = Connector.getDefaultConnection();
    }

    public String uploadImage(byte[] data, String contentType) throws Exception {
        String id = UUID.randomUUID().toString();
        Connection con = Connector.getDefaultConnection();
        PreparedStatement ps = con.prepareStatement(
                "INSERT INTO images(imageId, imageType, imageData) VALUE (?, ?, ?)");
        ps.setString(1, id);
        ps.setString(2, contentType);
        ps.setBytes(3, data);
        int rowsUpdated = ps.executeUpdate();
        if (rowsUpdated == 0) {
            throw new SQLException("Failed to upload file");
        }
        return id;
    }

    public MyImage downloadImage(String id) throws Exception {
        Connection con = Connector.getDefaultConnection();
        PreparedStatement ps = con.prepareStatement(
                "SELECT imageData, imageType FROM images WHERE imageId = ?");
        ps.setString(1, id);
        ResultSet res = ps.executeQuery();
        if (!res.next()) {
            throw new SQLException("Failed to get image with id " + id);
        }
        return new MyImage(
                res.getBytes(1),
                res.getString(2)
        );
    }
}

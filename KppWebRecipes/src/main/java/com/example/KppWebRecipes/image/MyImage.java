package com.example.KppWebRecipes.image;

public class MyImage {
    byte[] data;
    String contentType;

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public MyImage(byte[] data, String contentType) {
        this.data = data;
        this.contentType = contentType;
    }
}

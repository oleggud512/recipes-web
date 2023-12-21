package com.example.KppWebRecipes.image;

import com.example.KppWebRecipes.Connector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.ServerRequest;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/image")
public class ImageController {
    ImageRepository repo;

    @Autowired
    ImageController(ImageRepository repo) {
        this.repo = repo;
    }

    @PostMapping(path = "upload")
    public String uploadImage(@RequestParam("image") MultipartFile image) throws Exception {
        return repo.uploadImage(image.getBytes(), image.getContentType());
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") String id) throws Exception {
        MyImage image = repo.downloadImage(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(image.getContentType()));
        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
    }
}

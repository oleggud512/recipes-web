package com.example.KppWebRecipes.grocery;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // TODO: how to make RestController inside RestController
@CrossOrigin
@RequestMapping(path = "api/v1/grocery")
public class GroceryController {
    private final GroceryService groceryService;

    @Autowired
    public GroceryController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @GetMapping
    public List<Grocery> getGroceries(@RequestParam(required = false) String name) {
        System.out.println(name);
        return groceryService.getGroceries();
    }

    @PostMapping
    public Grocery addNewGrocery(@RequestBody GroceryQuery grocery) {
        System.out.println(grocery);
        return groceryService.addNewGrocery(
                grocery.getName(),
                grocery.getPhotoUrl());
    }

    @DeleteMapping(path = "{groceryId}")
    public void deleteGrocery(@PathVariable("groceryId") Long groceryId) {
        groceryService.deleteGrocery(groceryId);
    }

    @PutMapping(path = "{groceryId}")
    public Grocery updateGrocery(
            @PathVariable("groceryId") Long groceryId,
            @RequestBody GroceryQuery grocery) {
        System.out.println(grocery);
        return groceryService.updateGrocery(
                groceryId,
                grocery.getName(),
                grocery.getPhotoUrl());
    }
}

package com.example.KppWebRecipes.grocery;

import com.example.KppWebRecipes.grocery.etities.Grocery;
import com.example.KppWebRecipes.grocery.etities.GroceryQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // TODO: how to create RestController inside RestController
@CrossOrigin
@RequestMapping(path = "api/v1/grocery")
public class GroceryController {
    private final GroceryService groceryService;

    @Autowired
    public GroceryController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @GetMapping
    public List<Grocery> getGroceries(@RequestParam(required = false) String name) throws Exception {
        return groceryService.getGroceries(name);
    }

    @PostMapping
    public Grocery addNewGrocery(@RequestBody GroceryQuery grocery) throws Exception {
        System.out.println(grocery);
        return groceryService.addNewGrocery(
                grocery.getName(),
                grocery.getPhotoUrl());
    }

    @DeleteMapping(path = "{groceryId}")
    public void deleteGrocery(@PathVariable("groceryId") Long groceryId) throws Exception {
        groceryService.deleteGrocery(groceryId);
    }

    @PutMapping(path = "{groceryId}")
    public Grocery updateGrocery(
            @PathVariable("groceryId") Long groceryId,
            @RequestBody GroceryQuery grocery) throws Exception {
        System.out.println(grocery);
        return groceryService.updateGrocery(
                groceryId,
                grocery.getName(),
                grocery.getPhotoUrl());
    }
}

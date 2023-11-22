package com.example.KppWebRecipes.grocery;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class GroceryService {

    private final GroceryRepository groceryRepository;

    @Autowired
    public GroceryService(GroceryRepository groceryRepository) {
        this.groceryRepository = groceryRepository;
    }

    public List<Grocery> getGroceries() {
        return groceryRepository.findAll();
    }

    public Grocery addNewGrocery(String name, String photoUrl) {
        Optional<Grocery> groceryByName =
                groceryRepository.findGroceryByName(name);
        if (groceryByName.isPresent()) {
            throw new IllegalStateException("name taken");
        }
        return groceryRepository.save(new Grocery(name, photoUrl));
    }

    public void deleteGrocery(Long groceryId) {
        groceryRepository.findById(groceryId);
        boolean exists = groceryRepository.existsById(groceryId);
        if (!exists) {
            throw new IllegalStateException("grocery with id " + groceryId +
                    " does not exists");
        }
        groceryRepository.deleteById(groceryId);
    }

    @Transactional
    public Grocery updateGrocery(Long groceryId, String name, String photoUrl) {
        Grocery grocery = groceryRepository.findById(groceryId)
                .orElseThrow(() -> new IllegalStateException(
                        "no grocery with id " + groceryId));

        if (name != null && !name.isEmpty() &&
                !Objects.equals(grocery.getName(), name)) {
            Optional<Grocery> groceryByName =
                    groceryRepository.findGroceryByName(name);
            if (groceryByName.isPresent()) {
                throw new IllegalStateException("name taken");
            }
            grocery.setName(name);
        }

        if (photoUrl != null && !photoUrl.isEmpty() &&
                !Objects.equals(grocery.getName(), photoUrl)) {
            grocery.setPhotoUrl(photoUrl);
        }
        return grocery;
    }
}

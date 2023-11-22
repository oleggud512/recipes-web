package com.example.KppWebRecipes.grocery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroceryRepository
        extends JpaRepository<Grocery, Long> { // Long - type of id of Grocery

    @Query("SELECT g FROM Grocery g WHERE g.name = ?1") // TODO: странно, ведь в базе данных оно со строчной начинается.. потому что это JPQL а не MySQL?
    Optional<Grocery> findGroceryByName(String name);
}

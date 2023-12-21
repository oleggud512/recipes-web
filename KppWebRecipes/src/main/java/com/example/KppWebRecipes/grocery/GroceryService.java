package com.example.KppWebRecipes.grocery;

import com.example.KppWebRecipes.grocery.dao.GroceryDAO;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOFactory;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOType;
import com.example.KppWebRecipes.grocery.dao.GroceryUpdateCommand;
import com.example.KppWebRecipes.grocery.etities.Grocery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class GroceryService {

    private final GroceryDAO dao;

    public GroceryService() throws Exception {
        dao = GroceryDAOFactory.getDao(GroceryDAOType.MySQL);
    }

    public List<Grocery> getGroceries(String name) throws Exception {
        return dao.getGroceriesByName(name);
    }

    public Grocery addNewGrocery(String name, String photoUrl) throws Exception {
//        Optional<Grocery> groceryByName =
//                groceryRepository.findGroceryByName(name);
//        if (groceryByName.isPresent()) {
//            throw new IllegalStateException("name taken");
//        }
//        return groceryRepository.save(new Grocery(name, photoUrl));
        return dao.addNewGrocery(name, photoUrl);
    }

    public void deleteGrocery(Long groceryId) throws Exception {
//        groceryRepository.findById(groceryId);
//        boolean exists = groceryRepository.existsById(groceryId);
//        if (!exists) {
//            throw new IllegalStateException("grocery with id " + groceryId +
//                    " does not exists");
//        }
//        groceryRepository.deleteById(groceryId);
        dao.deleteGrocery(groceryId);
    }

    @Transactional
    public Grocery updateGrocery(Long groceryId, String name, String photoUrl) throws Exception {
//        Grocery grocery = groceryRepository.findById(groceryId)
//                .orElseThrow(() -> new IllegalStateException(
//                        "no grocery with id " + groceryId));
//
//        if (name != null && !name.isEmpty() &&
//                !Objects.equals(grocery.getName(), name)) {
//            Optional<Grocery> groceryByName =
//                    groceryRepository.findGroceryByName(name);
//            if (groceryByName.isPresent()) {
//                throw new IllegalStateException("name taken");
//            }
//            grocery.setName(name);
//        }
//
//        if (photoUrl != null && !photoUrl.isEmpty() &&
//                !Objects.equals(grocery.getName(), photoUrl)) {
//            grocery.setPhotoUrl(photoUrl);
//        }
//        return grocery;
        GroceryUpdateCommand c = new GroceryUpdateCommand(groceryId);
        c.setName(name);
        c.setPhotoUrl(photoUrl);
        return dao.updateGrocery(c);
    }
}

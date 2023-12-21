package com.example.KppWebRecipes.recipe;

import com.example.KppWebRecipes.grocery.dao.GroceryDAO;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOFactory;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOType;
import com.example.KppWebRecipes.recipe.dao.RecipeDAO;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOFactory;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOType;
import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeDAO recipeDao;
    private final GroceryDAO groceryDao;

    public RecipeService() throws Exception {
        recipeDao = RecipeDAOFactory.getDao(RecipeDAOType.MySQL);
        groceryDao = GroceryDAOFactory.getDao(GroceryDAOType.MySQL);
    }


    public List<Recipe> getRecipes(String name) throws Exception {
        return recipeDao.getRecipes(name);
    }

    public Recipe getRecipeById(Long recipeId) throws Exception {
        return recipeDao.getRecipeById(recipeId);
    }

    public Recipe addRecipe(
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries) throws Exception {
//        List<Grocery> groceries = groceryRepository.findAllById(groceryIds);
//        Recipe recipeObj =
//                new Recipe(name, recipe, description, photoUrl, groceries);
//        return recipeRepository.save(recipeObj);
        return recipeDao.addRecipe(name, recipe, description, photoUrl, groceries);
    }

    public void deleteRecipe(Long recipeId) throws Exception {
//        recipeRepository.deleteById(recipeId);
        recipeDao.deleteRecipe(recipeId);
    }

    public Recipe updateRecipe(
            Long recipeId,
            String name,
            String recipe,
            String description,
            String photoUrl,
            List<RecipeGrocery> groceries) throws Exception {
        return recipeDao.updateRecipe(recipeId, name, recipe, description, photoUrl, groceries);
//        Recipe recipeObj = recipeRepository.findById(recipeId)
//                .orElseThrow(() -> new IllegalStateException(
//                        "no recipe with id " + recipeId + " exists"));
//
//        if (name != null &&
//                !name.isEmpty() &&
//                !Objects.equals(recipeObj.getName(), name)) {
//            // TODO: (1) add error handling here
//            recipeObj.setName(name);
//        }
//
//        if (recipe != null &&
//                !Objects.equals(recipeObj.getRecipe(), recipe)) {
//            recipeObj.setRecipe(recipe);
//        }
//
//        if (description != null &&
//                !Objects.equals(recipeObj.getDescription(), description)) {
//            recipeObj.setDescription(description);
//        }
//
//        if (photoUrl != null &&
//                !Objects.equals(recipeObj.getPhotoUrl(), photoUrl)) {
//            recipeObj.setPhotoUrl(photoUrl);
//        }
//
//        if (groceryIds != null) {
//            List<Grocery> groceries = groceryRepository.findAllById(groceryIds);
//            recipeObj.setGroceries(groceries);
//        }
//
//        return recipeObj;
    }
}

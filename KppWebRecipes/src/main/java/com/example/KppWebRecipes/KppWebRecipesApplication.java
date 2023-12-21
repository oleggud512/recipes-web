package com.example.KppWebRecipes;

import com.example.KppWebRecipes.grocery.dao.GroceryDAO;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOFactory;
import com.example.KppWebRecipes.grocery.dao.GroceryDAOType;
import com.example.KppWebRecipes.grocery.dao.GroceryUpdateCommand;
import com.example.KppWebRecipes.grocery.etities.Grocery;
import com.example.KppWebRecipes.recipe.dao.RecipeDAO;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOFactory;
import com.example.KppWebRecipes.recipe.dao.RecipeDAOType;
import com.example.KppWebRecipes.recipe.entities.Recipe;
import com.example.KppWebRecipes.recipe.entities.RecipeGrocery;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class KppWebRecipesApplication {

	public static void main(String[] args) throws Exception {
		DbUtils.dropTables(Connector.getDefaultConnection());
		DbUtils.createTables(Connector.getDefaultConnection());

//		GroceryDAO dao = GroceryDAOFactory.getDao(GroceryDAOType.MySQL);
//		RecipeDAO rdao = RecipeDAOFactory.getDao(RecipeDAOType.MySQL);
//
//		dao.addNewGrocery("Potato", null);
//		dao.addNewGrocery("Carrot", null);
//
//		System.out.println(dao.getGroceriesByName(""));
//
//		GroceryUpdateCommand c = new GroceryUpdateCommand(1L);
//		c.setName("something");
//		dao.updateGrocery(c);
//
//		System.out.println(dao.getGroceriesByName(""));
//
//		c = new GroceryUpdateCommand(1L);
//		c.setPhotoUrl("some long url url");
//		dao.updateGrocery(c);
//
//		System.out.println(dao.getGroceriesByName(""));
//
//		c = new GroceryUpdateCommand(1L);
//		c.setPhotoUrl(null);
//		dao.updateGrocery(c);
//
//		System.out.println(dao.getGroceriesByName(""));
//
//		dao.deleteGrocery(1L);
//
//		System.out.println(dao.getGroceriesByName(""));
//
//		try {
//			// 1. Create a recipe
//			Recipe addedRecipe = rdao.addRecipe(
//					"Pasta Carbonara",
//					"Recipe details...",
//					"Delicious pasta dish",
//					"carbonara.jpg",
//					List.of(new RecipeGrocery(2L, 250.0))
//			);
//
//			// 2. Update something inside the recipe
//			rdao.updateRecipe(
//					addedRecipe.getId(),
//					"Spaghetti Carbonara",
//					addedRecipe.getRecipe(),
//					"Improved recipe description...",
//					addedRecipe.getPhotoUrl(),
//					List.of(new RecipeGrocery(2L, 300.0))
//			);
//
//			// 3. Fetch the recipe list
//			List<Recipe> recipes = rdao.getRecipes("");
//
//			// 4. Print the recipe list
//			System.out.println("Recipe List:");
//			for (Recipe recipe : recipes) {
//				System.out.println("ID: " + recipe.getId());
//				System.out.println("Name: " + recipe.getName());
//				System.out.println("Description: " + recipe.getDescription());
//				System.out.println("Photo URL: " + recipe.getPhotoUrl());
//				System.out.println("Groceries:");
//
//				for (RecipeGrocery grocery : recipe.getGroceries()) {
//					System.out.println("  Grocery ID: " + grocery.getId());
//					System.out.println("  Grocery name: " + grocery.getName());
//					System.out.println("  Grocery photoUrl: " + grocery.getPhotoUrl());
//					System.out.println("  Amount: " + grocery.getAmount());
//				}
//
//				System.out.println("------------");
//			}
//
//			// 5. Remove the recipe
//			rdao.deleteRecipe(addedRecipe.getId());
//			System.out.println(rdao.getRecipes(""));
//
//		} catch (Exception e) {
//			// Handle exceptions appropriately
//			e.printStackTrace();
//		}
		GroceryDAO dao = GroceryDAOFactory.getDao(GroceryDAOType.MySQL);
		RecipeDAO rdao = RecipeDAOFactory.getDao(RecipeDAOType.MySQL);

		Grocery grocery = dao.addNewGrocery("Potato", null);

		List<RecipeGrocery> recipeGroceries = new ArrayList<RecipeGrocery>();
		RecipeGrocery grocery1 = new RecipeGrocery(grocery.getId(), 300.0);
		recipeGroceries.add(grocery1);

		rdao.addRecipe("First good recipe", "Do something with potato", "Some description", null, recipeGroceries);

		SpringApplication.run(KppWebRecipesApplication.class, args);
	}

}

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
import java.util.Map;

@SpringBootApplication
public class KppWebRecipesApplication {

	public static void main(String[] args) throws Exception {
//		DbUtils.dropTables(Connector.getDefaultConnection());
//		DbUtils.createTables(Connector.getDefaultConnection());

//		GroceryDAO dao = GroceryDAOFactory.getDao(GroceryDAOType.MySQL);
//		RecipeDAO rdao = RecipeDAOFactory.getDao(RecipeDAOType.MySQL);
//
//		Grocery grocery = dao.addNewGrocery("Potato", null);
//
//		List<RecipeGrocery> recipeGroceries = new ArrayList<RecipeGrocery>();
//		RecipeGrocery grocery1 = new RecipeGrocery(grocery.getId(), 300.0);
//		recipeGroceries.add(grocery1);
//
//		rdao.addRecipe("First good recipe", "Do something with potato", "Some description", null, recipeGroceries);

		List<Recipe> recipes = new ArrayList<>();

		// Recipe 1: Spaghetti Bolognese
		Recipe recipe1 = new Recipe(null, "Spaghetti Bolognese",
				"1. Heat olive oil in a pan.\n2. Add minced beef and cook until browned.\n3. Add chopped onions, garlic, and carrots. Cook until softened.\n4. Stir in tomato paste, crushed tomatoes, and beef broth.\n5. Season with salt, pepper, and Italian herbs.\n6. Simmer for 30 minutes.\n7. Cook spaghetti according to package instructions.\n8. Serve the Bolognese sauce over spaghetti.",
				"Spaghetti Bolognese is a classic Italian dish loved for its rich and hearty flavor. The combination of savory minced beef, aromatic onions, and garlic creates a delicious base, while carrots add a touch of sweetness. The tomato paste and crushed tomatoes bring a burst of tanginess, balanced by the depth of beef broth. Seasoned with a medley of salt, pepper, and Italian herbs, the sauce simmers to perfection, allowing the flavors to meld.\n\nThis comforting dish is a go-to for family dinners or gatherings. The aroma wafting through the kitchen as the Bolognese sauce simmers is enough to make anyone's mouth water. Served over perfectly cooked spaghetti, it's a wholesome and satisfying meal that never fails to please.",
				null, null);

		// Groceries for Recipe 1
		List<RecipeGrocery> groceries1 = new ArrayList<>();
		groceries1.add(new RecipeGrocery(null, "olive oil", null, 2));
		groceries1.add(new RecipeGrocery(null, "minced beef", null, 500));
		groceries1.add(new RecipeGrocery(null, "onions", null, 2));
		groceries1.add(new RecipeGrocery(null, "garlic", null, 3));
		groceries1.add(new RecipeGrocery(null, "carrots", null, 2));
		groceries1.add(new RecipeGrocery(null, "tomato paste", null, 3));
		groceries1.add(new RecipeGrocery(null, "crushed tomatoes", null, 800));
		groceries1.add(new RecipeGrocery(null, "beef broth", null, 1));
		groceries1.add(new RecipeGrocery(null, "salt", null, 1));
		groceries1.add(new RecipeGrocery(null, "pepper", null, 1));
		groceries1.add(new RecipeGrocery(null, "Italian herbs", null, 1));
		groceries1.add(new RecipeGrocery(null, "spaghetti", null, 400));

		recipe1.setGroceries(groceries1);
		recipes.add(recipe1);

		// Recipe 2: Chicken Alfredo Pasta
		Recipe recipe2 = new Recipe(null, "Chicken Alfredo Pasta",
				"1. Cook fettuccine pasta according to package instructions.\n2. Season chicken breasts with salt and pepper.\n3. Sear chicken in a hot skillet until golden and cooked through.\n4. In the same skillet, melt butter and sauté garlic.\n5. Pour in heavy cream and bring to a simmer.\n6. Add grated Parmesan cheese and stir until melted.\n7. Slice cooked chicken and toss with the Alfredo sauce.\n8. Serve the chicken Alfredo over fettuccine.",
				"Indulge in the creamy decadence of Chicken Alfredo Pasta. This mouthwatering dish is a perfect blend of succulent chicken, al dente fettuccine, and a luscious Alfredo sauce. The chicken is seasoned to perfection, creating a golden exterior and juicy interior. As it mingles with the velvety sauce, each bite is a symphony of flavors.\n\nThe Alfredo sauce, a heavenly combination of butter, garlic, heavy cream, and Parmesan cheese, coats the pasta and chicken in a rich, silky embrace. The result is a dish that's both comforting and elegant, making it an ideal choice for a special dinner or a cozy night in.",
				null, null);

		// Groceries for Recipe 2
		List<RecipeGrocery> groceries2 = new ArrayList<>();
		groceries2.add(new RecipeGrocery(null, "fettuccine pasta", null, 400));
		groceries2.add(new RecipeGrocery(null, "chicken breasts", null, 600));
		groceries2.add(new RecipeGrocery(null, "salt", null, 1));
		groceries2.add(new RecipeGrocery(null, "pepper", null, 1));
		groceries2.add(new RecipeGrocery(null, "butter", null, 150));
		groceries2.add(new RecipeGrocery(null, "garlic", null, 3));
		groceries2.add(new RecipeGrocery(null, "heavy cream", null, 300));
		groceries2.add(new RecipeGrocery(null, "Parmesan cheese", null, 200));

		recipe2.setGroceries(groceries2);
		recipes.add(recipe2);

		// Recipe 3: Vegetarian Stir-Fry
		Recipe recipe3 = new Recipe(null, "Vegetarian Stir-Fry",
				"1. Heat sesame oil in a wok or large skillet.\n2. Add sliced tofu and stir-fry until golden.\n3. Add broccoli, bell peppers, and snap peas.\n4. In a bowl, whisk together soy sauce, ginger, and garlic.\n5. Pour the sauce over the vegetables and tofu.\n6. Toss everything until well coated and heated through.\n7. Serve the vegetarian stir-fry over rice or noodles.",
				"Embrace the vibrant flavors of a Vegetarian Stir-Fry, a colorful and nutritious dish that's quick and easy to prepare. This stir-fry combines crisp tofu, crunchy broccoli, sweet bell peppers, and tender snap peas, creating a delightful medley of textures and tastes.\n\nThe key to this dish lies in the perfectly balanced sauce—a mixture of soy sauce, fresh ginger, and garlic. This savory concoction elevates the stir-fry, infusing it with umami goodness. Whether served over steamed rice or noodles, this Vegetarian Stir-Fry is a versatile and satisfying option for both vegetarians and those looking to incorporate more plant-based meals into their diet.",
				null, null);

		// Groceries for Recipe 3
		List<RecipeGrocery> groceries3 = new ArrayList<>();
		groceries3.add(new RecipeGrocery(null, "sesame oil", null, 2));
		groceries3.add(new RecipeGrocery(null, "tofu", null, 400));
		groceries3.add(new RecipeGrocery(null, "broccoli", null, 1));
		groceries3.add(new RecipeGrocery(null, "bell peppers", null, 2));
		groceries3.add(new RecipeGrocery(null, "snap peas", null, 150));
		groceries3.add(new RecipeGrocery(null, "soy sauce", null, 3));
		groceries3.add(new RecipeGrocery(null, "ginger", null, 1));
		groceries3.add(new RecipeGrocery(null, "garlic", null, 2));
		groceries3.add(new RecipeGrocery(null, "rice or noodles", null, 300));

		recipe3.setGroceries(groceries3);
		recipes.add(recipe3);

		// Recipe 4: Mushroom Risotto
		Recipe recipe4 = new Recipe(null, "Mushroom Risotto",
				"1. Sauté chopped onions in olive oil until translucent.\n2. Add Arborio rice and cook until lightly toasted.\n3. Pour in white wine and simmer until mostly absorbed.\n4. Gradually add warm vegetable broth, stirring frequently.\n5. Stir in sliced mushrooms and continue adding broth.\n6. Finish with Parmesan cheese and butter.\n7. Season with salt and pepper.\n8. Serve the mushroom risotto hot.",
				"Elevate your dining experience with Mushroom Risotto, a luxurious and creamy Italian dish that captivates the senses. The heart of this recipe lies in the Arborio rice, which, when combined with carefully selected mushrooms, creates a velvety texture and a rich, earthy flavor.\n\nThe process of making risotto is a culinary journey, starting with sautéing onions to achieve a sweet aroma. The addition of white wine introduces complexity, and the gradual incorporation of warm vegetable broth allows the rice to absorb the flavors and attain a delightful creaminess. Sliced mushrooms add an earthy dimension, and the final touch of Parmesan cheese and butter creates a decadent finish. This Mushroom Risotto is a masterpiece that brings comfort and sophistication to your table.",
				null, null);

		// Groceries for Recipe 4
		List<RecipeGrocery> groceries4 = new ArrayList<>();
		groceries4.add(new RecipeGrocery(null, "olive oil", null, 2));
		groceries4.add(new RecipeGrocery(null, "onions", null, 2));
		groceries4.add(new RecipeGrocery(null, "Arborio rice", null, 300));
		groceries4.add(new RecipeGrocery(null, "white wine", null, 150));
		groceries4.add(new RecipeGrocery(null, "vegetable broth", null, 800));
		groceries4.add(new RecipeGrocery(null, "sliced mushrooms", null, 200));
		groceries4.add(new RecipeGrocery(null, "Parmesan cheese", null, 100));
		groceries4.add(new RecipeGrocery(null, "butter", null, 50));
		groceries4.add(new RecipeGrocery(null, "salt", null, 1));
		groceries4.add(new RecipeGrocery(null, "pepper", null, 1));

		recipe4.setGroceries(groceries4);
		recipes.add(recipe4);

		// Recipe 5: Grilled Salmon with Lemon-Dill Sauce
		Recipe recipe5 = new Recipe(null, "Grilled Salmon with Lemon-Dill Sauce",
				"1. Preheat the grill to 475°F (245°C).\n2. Season salmon fillets with salt, pepper, and olive oil.\n3. Grill salmon for 4-5 minutes per side, or until cooked through.\n4. In a bowl, mix together Greek yogurt, lemon juice, and fresh dill.\n5. Serve the grilled salmon with the lemon-dill sauce on the side.",
				"Elevate your seafood experience with Grilled Salmon featuring a refreshing Lemon-Dill Sauce. This dish combines the succulence of perfectly grilled salmon with the bright and zesty flavors of lemon and dill. It's a celebration of simplicity and freshness.\n\nStart by preheating the grill to medium-high heat, ensuring that each salmon fillet is seasoned with a touch of salt, pepper, and a drizzle of olive oil. The grill imparts a smoky char, enhancing the natural richness of the salmon. Meanwhile, a tangy and herbaceous sauce is crafted by blending Greek yogurt, freshly squeezed lemon juice, and aromatic dill. This sauce adds a burst of citrusy brightness that perfectly complements the grilled salmon. Enjoy a light, flavorful, and health-conscious meal with Grilled Salmon and Lemon-Dill Sauce.",
				null, null);

		// Groceries for Recipe 5
		List<RecipeGrocery> groceries5 = new ArrayList<>();
		groceries5.add(new RecipeGrocery(null, "salmon fillets", null, 600));
		groceries5.add(new RecipeGrocery(null, "salt", null, 1));
		groceries5.add(new RecipeGrocery(null, "pepper", null, 1));
		groceries5.add(new RecipeGrocery(null, "olive oil", null, 2));
		groceries5.add(new RecipeGrocery(null, "Greek yogurt", null, 150));
		groceries5.add(new RecipeGrocery(null, "lemon juice", null, 2));
		groceries5.add(new RecipeGrocery(null, "fresh dill", null, 1));

		recipe5.setGroceries(groceries5);
		recipes.add(recipe5);

		// Recipe 6: Caprese Salad
		Recipe recipe6 = new Recipe(null, "Caprese Salad",
				"1. Arrange sliced tomatoes and fresh mozzarella on a serving platter.\n2. Tuck fresh basil leaves between the tomato and mozzarella slices.\n3. Drizzle extra virgin olive oil over the salad.\n4. Sprinkle with salt and pepper to taste.\n5. Optionally, balsamic glaze can be drizzled for added flavor.\n6. Serve the Caprese Salad immediately.",
				"Experience the simplicity of Italian cuisine with a refreshing Caprese Salad. This classic dish celebrates the vibrant flavors of ripe tomatoes, creamy mozzarella, and fragrant basil. Assembling the salad is an art, with each ingredient carefully arranged to showcase its freshness and taste.\n\nThe key to the Caprese Salad is the quality of the ingredients. Juicy tomatoes provide a burst of sweetness, while the creamy mozzarella adds a luxurious texture. Fresh basil leaves contribute an aromatic touch, and a drizzle of extra virgin olive oil enhances the overall richness. The finishing touch of salt and pepper elevates the flavors, creating a light and satisfying salad that's perfect for any occasion.",
				null, null);

		// Groceries for Recipe 6
		List<RecipeGrocery> groceries6 = new ArrayList<>();
		groceries6.add(new RecipeGrocery(null, "tomatoes", null, 4));
		groceries6.add(new RecipeGrocery(null, "fresh mozzarella", null, 200));
		groceries6.add(new RecipeGrocery(null, "fresh basil leaves", null, 1));
		groceries6.add(new RecipeGrocery(null, "extra virgin olive oil", null, 2));
		groceries6.add(new RecipeGrocery(null, "salt", null, 1));
		groceries6.add(new RecipeGrocery(null, "pepper", null, 1));
		groceries6.add(new RecipeGrocery(null, "balsamic glaze (optional)", null, 1));

		recipe6.setGroceries(groceries6);
		recipes.add(recipe6);

		for (Recipe recipe : recipes) {
			Recipe res = DbUtils.fillTables(recipe.getName(), recipe.getRecipe(), recipe.getDescription(), recipe.getPhotoUrl(), recipe.getGroceries());
			System.out.println(res);
		}

		SpringApplication.run(KppWebRecipesApplication.class, args);
	}



}

const path = require('path')


module.exports = {
    entry: {
        edit_recipe: "./js/features/recipes/presentation/edit_recipe_page/index.js",
        recipe: "./js/features/recipes/presentation/recipe_page/index.js",
        recipes: "./js/features/recipes/presentation/recipes_list_page/index.js",
        groceries: "./js/features/groceries/presentation/grocery_list_page/index.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: ['babel-loader'],
            },
        ],
    },
}

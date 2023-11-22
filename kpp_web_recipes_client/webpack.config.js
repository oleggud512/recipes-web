const path = require('path');

// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = 'style-loader';



// const config = {
//     entry: {
//         edit_recipe: "./templates/edit_recipe.html",
//         recipe: "./templates/recipe.html",
//         recipes: "./templates/recipes.html",
//         groceries: "./templates/groceries.html"
//     },
//     output: {
//         filename: "[name].js",
//         path: path.resolve(__dirname, 'dist'),
//     },
//     devServer: {
//         open: true,
//         host: 'localhost',
//     },
//     plugins: [
//         // Add your plugins here
//         // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/i,
//                 loader: 'babel-loader',
//             },
//             {
//                 test: /\.css$/i,
//                 use: [stylesHandler,'css-loader'],
//             },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//                 type: 'asset',
//             },
//             {
//                 test: /\.html$/,
//                 use: [
//                   'html-loader',
//                 ],
//               },
//             // Add your rules for custom modules here
//             // Learn more about loaders from https://webpack.js.org/loaders/
//         ],
//     },
// };

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';
        
        
//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };
// const path = require('path');


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
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            //     type: 'asset',
            // },
            // {
            //     test: /\.html$/,
            //     use: [
            //         'html-loader',
            //     ],
            // },
            // Add other rules as needed for CSS, JavaScript, etc.
        ],
    },
};

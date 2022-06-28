import { Router } from 'express';
const router = Router();

import recipe from '../controllers/recipe/index.js';

// Gets a recipe by ID
router.get('/getRecipe/:recipeID', (req, res) => {
    return recipe.getRecipe(req.params, res)
});

// Parses a recipe from data by type
router.get('/parseRecipe/:type/:data*', (req, res) => {
    return recipe.parseRecipe(req.params, res)
});

// Gets LD JSON from a url
router.get('/getLDJSONfromURL/:url*', (req, res) => {
    return recipe.getLDJSONfromURL(req.params, res)
});

export default router;
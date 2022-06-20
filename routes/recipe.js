import { Router } from 'express';
const router = Router();

import recipe from '../controllers/recipe/index.js';

// Get Recipe
router.get('/getRecipe/:recipeID', (req, res) => {
    return recipe.getRecipe(req.params.recipeID, res)
});

// Parse recipe
router.get('/parseRecipe/:type/:data', (req, res) => {
    return recipe.parseRecipe(req.params, res)
});

export default router;
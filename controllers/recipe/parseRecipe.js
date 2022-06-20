import asyncWrapper from '../../middleware/asyncWrapper.js'
import * as recipeParser from '../../utils/recipe/recipeParser.js'
import * as error from '../../utils/misc/errors/error.js'

// Parse recipe
const parseRecipe = asyncWrapper(async (req, res) => {

    // Create an empty JSON for the recipe to lie
    let recipeJSON;

    // Switch type as defined in the request
    switch (req.type){

        // If we are parsing a URL,
        case "url":
            // Call the URL function of recipeParser
            recipeJSON = await recipeParser.url(req.data)
            break;

        // If the type is unknown,
        // Return an error
        default:
            recipeJSON = error.returnMessage("recipe.1")
            break;
    }

    // Return recipe JSON
    // !!TEMP!!
    // This is temporary until recipe saving/database is introduced
    res.status(200).json({
        success: true,
        data: recipeJSON,
    });

});

export default parseRecipe;
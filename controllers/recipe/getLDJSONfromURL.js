import asyncWrapper from '../../middleware/asyncWrapper.js'
import * as recipeParser from '../../utils/recipe/recipeParser.js'
import * as error from '../../utils/misc/errors/error.js'

// Parse recipe
const getLDJSONfromURL = asyncWrapper(async (req, res) => {

    // Create an empty JSON for the recipe to lie
    let recipeJSON;


    // Call the URL function of recipeParser
    recipeJSON = await recipeParser.ldjson(`${req.url}${req[0]}`)

    // Return recipe JSON
    res.status(200).json({
        success: true,
        data: recipeJSON,
    });

});

export default getLDJSONfromURL;
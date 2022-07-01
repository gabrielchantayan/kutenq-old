import * as webTools from '../web/webTools.js';
import * as recipeNormalizer from './recipeNormalizer.js'



/**
 * Parses a recipe based on a given URL
 * @param  {string} url URL to grab recipe from
 * @return  {JSON} The recipe JSON
 */
async function url (url) {
    
    // Grab the schemas of the website
    const data = await webTools.getSchemas(url)

    // Normalize and return the recipe
    const normalizedRecipe = recipeNormalizer.ldjson(data)
    return normalizedRecipe;

}



/**
 * Grabs the LD+JSON from a URL
 * @param  {string} url URL to grab LD+JSON from
 * @return  {JSON} The LD+JSON schemas
 */
async function ldjson (url) {
    
    const data = await webTools.getSchemas(url)

    return data;

}

export { url, ldjson }
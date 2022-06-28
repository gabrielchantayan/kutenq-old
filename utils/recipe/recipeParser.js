import * as webTools from '../web/webTools.js';
import * as recipeNormalizer from './recipeNormalizer.js'

async function url (url) {
    
    const data = await webTools.getSchemas(url)

    const normalizedRecipe = recipeNormalizer.ldjson(data)

    return normalizedRecipe;

}

export { url }
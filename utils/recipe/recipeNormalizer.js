import { normalizeFraction } from '../misc/misc.js'


// Regex for testing numbers
const numberRegex = /(\d\/?\d?[-\/\s]\d?\/?\d?)/

// Regex for testing A...of
const aOfRegex = /^(?:"?a\s?)(.*)(?:\sof)/i

// Regex for notes
const noteRegex = /(?:\()(.+)(?:\))|(?:;\s)(.*)/

const noUnitRegex = /\d\s\s/

/**
 * Parses LD+JSON
 * @param  {JSON} ld LD+JSON Recipe Schema
 * @return  {JSON} The formatted recpie
 */
function ldjson(ld){
    // Create empty recipe JSON
    let recipe = {
        "version" : 1,
        "isTranslateable" : false,
        "ingredients" : [],
        "instructions" : [],
        "imported" : Date.now()
    }

    // Check and add to recipe
    // Speficy a jTitle if you want a custom title in the JSON
    function checkAndAdd(section, title, jTitle = undefined){

        // If there is no jTitle argiment, set to title
        jTitle = (jTitle == undefined ? title : jTitle)

        if (section.hasOwnProperty(title)) {
            recipe[jTitle] = section[title]
        }
    }

    // Iterate through root
    for (let i in ld["@graph"]) {
        let section = ld["@graph"][i]


        // Test if it's the person section
        if (section["@type"] == "Person"){

            // Check for the Author's name
            checkAndAdd(section, "name", "author")
        }

        // Test if it's the recipe section
        if (section["@type"] == "Recipe"){

            // Check for the recipe name
            checkAndAdd(section, "name");
            checkAndAdd(section, "description");


            // Check for the recipe category
            checkAndAdd(section, "recipeCategory");

            // Check for the recipe cuisine
            checkAndAdd(section, "recipeCuisine");

            if (section.hasOwnProperty("recipeYield")) recipe['yeild'] = section['recipeYield'][1]


            checkAndAdd(section, "performTime")
            checkAndAdd(section, "prepTime")
            checkAndAdd(section, "totalTime")
            checkAndAdd(section, "nutrition")
            checkAndAdd(section, "suitableForDiet")




            // Check if the section has ingredients
            if (section.hasOwnProperty("recipeIngredient")) {

                // Then iterate through each ingredient, 
                for (let ingredient in section['recipeIngredient']){

                    // Normalizing the text, then parsing, then pushing to the
                    recipe['ingredients'].push(parseIngredients(normalizeText(section['recipeIngredient'][ingredient])))
                }
            }

            
            // Check if the section has a recipe
            if (section.hasOwnProperty("recipeInstructions")) {

                // Then iterate through each ingredient, 
                for (let instruction in section['recipeInstructions']){

                    // Normalize text, then push to recipe
                    recipe['instructions'].push(normalizeText(section['recipeInstructions'][instruction]['text']))
                }
            }
        }

        // Test if it's the article section
        if (section["@type"] == "Article"){

            // Check for keywords
            checkAndAdd(section, "keywords")

            // Check for language
            checkAndAdd(section, "inLanguage", "language")

        }

        // Test if it's the webpage section
        if (section["@type"] == "WebPage" || section["@type"].includes("WebPage")){

            // Add the import url
            checkAndAdd(section, "url", 'importUrl')

        }

        // Test if it's the image section
        if (section["@type"] == "ImageObject"){

            recipe['image'] = {}

            if (section.hasOwnProperty("url")) recipe['image']['url'] = section['url']
            if (section.hasOwnProperty("caption")) recipe['image']['caption'] = section['caption']
            if (section.hasOwnProperty("width")) recipe['image']['width'] = section['width']
            if (section.hasOwnProperty("height")) recipe['image']['height'] = section['height']
        }
        
    }

    return recipe
}
/**
 * Splits an ingredient phrase in to multiple parts
 * AMOUNT, UNIT, INGREDIENT, NOTES
 * @param  {string} ingredientPhrase Ingredient phrase (i.e. "1 cup water; chilled")
 * @return {JSON} Split ingredient phrase
 */
function parseIngredients(ingredientPhrase){
    // Create the empty ingredient onbject
    let ingObj = {
        'amount' : undefined,
        'unit' : undefined,
        'ingredient' : '',
        'notes' : undefined
    };

    // Holding variable
    let slice = 0;


    // If the line is only one item long, it is safe to assume that that is the ingredient
    if (ingredientPhrase.split(' ').length == 1) {
        ingObj['ingredient'] = ingredientPhrase;
        return ingObj;
    }


    // Check if there are notes
    if (noteRegex.test(ingredientPhrase)) {
        // If there are, set the notes to the notes regex match and slice the ingredient
        ingObj['notes'] = ingredientPhrase.match(noteRegex)[1] || ingredientPhrase.match(noteRegex)[2];

        let startOfIngPhr   = ingredientPhrase.slice(0, ingredientPhrase.match(noteRegex)['index'])
        let endOfIngPhr     = ingredientPhrase.slice(ingredientPhrase.match(noteRegex)['index'] + ingredientPhrase.match(noteRegex)[0].length)

        ingredientPhrase = startOfIngPhr + endOfIngPhr
    }

    ////
    ////  AMOUNT
    ////

    // Test the amount against the number regex to see if it is a match
    if (numberRegex.test(ingredientPhrase)) {

        let numberMatch = ingredientPhrase.match(numberRegex)

        // Set the amount to what the number regex captures
        ingObj['amount'] = numberMatch[1];

        
        // Test if there is a unit specified.
        // This is REALLY janky, but I am just testing for two whitespaces behind the amount
        if (!noUnitRegex.test(ingredientPhrase)){
            
            // I said it was gonna be janky
            // Slice the ingredient phrease by the length of the amount match
            ingredientPhrase = ingredientPhrase.slice(numberMatch[0].length)
            // Then, split it by whitespace
            // Return the first non-whitespace item
            // That should then be the unit
            let ingSplit = ingredientPhrase.split(' ').find(e => { return e != '' })
            ingObj['unit'] = ingSplit;

            // And now we take it off the ingredient phrase
            // Since there may be whitespace, we first find the index of the unit
            // Then we add the length of the unit to the phrase
            // Cut it there
            ingredientPhrase = ingredientPhrase.slice(ingredientPhrase.indexOf(ingSplit) + ingSplit.length)
        }

        // If there is no unit specified, slide the amount
        else {
            ingredientPhrase = ingredientPhrase.slice(ingredientPhrase.match(noUnitRegex)[0].length)
        }

    }

    
    // Sometimes recipies may have "A pinch of..." or "A clove of..."
    // This will test for that
    // Will need to add in the future code to normalize it with other languages
    // That will be fun
    if (aOfRegex.test(ingredientPhrase)){
        const regexMatch = ingredientPhrase.match(aOfRegex)
        
        // Set the amount to "1", and set the unit to the regex match
        ingObj['amount'] = "1";
        ingObj['unit'] = regexMatch[1]
        
        // Slice the ingredient phrase to just the ingredient and(?) notes
        slice = regexMatch['index'] + regexMatch[0].length + 1
        ingredientPhrase = ingredientPhrase.slice(slice)        
    }
    
    
      
    
    // Set the ingredient to what remains of the phrase
    ingObj['ingredient'] = ingredientPhrase

    // Trim leading and trailing whitespace
    for (let i in ingObj){ ingObj[i] = (ingObj[i] != undefined ? ingObj[i].trim() : ingObj[i]) }

    // Return the final array
    return ingObj
}



/**
 * Normalizes a given string
 * @param  {string} str Input string
 * @return  {string} Normalized string
 */
function normalizeText(str){
    // Normalize unicode fractions
    str = normalizeFraction(str)


    return str;
}



export { ldjson }
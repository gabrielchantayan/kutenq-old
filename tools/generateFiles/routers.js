// this turns an excel file into javascript
// i am so goated for this oh my god

// Router header template
const header = 
`import { Router } from 'express';
const router = Router();`


import { readFile, writeFile } from 'fs/promises';
import { toArray } from '../parseTXT.js';
import { checkAndCreateDir } from '../../utils/files/fileExists.js'
    

// Generate routes
async function generateRoutes() {

    // Grab routes files
    let routesFile = await toArray('./tools/excel/routes.txt')

    // Empty controller array and list of controllers
    let controllers = {}
    let contrList = []

    // index.js text
    let indexTxt = ''

    // Iterate through routes
    for (let i = 1; i < routesFile.length; i++) {

        // Shorthanding
        let r = routesFile[i];

        // Check if category has already been added, if not then add it
        if (!controllers.hasOwnProperty(r[0].toLowerCase())){
            controllers[r[0]] = {}
        }

        // Add info to the controllers
        // r[0] is the route (i.e. recipe)
        // r[2] is the function (i.e. getRecipe)
        controllers[r[0]][r[2]] = {
            'name' : r[1],
            'params' : r[3],
            'reqArgs' : r[4],
            'desc' : r[5]
        }

    }
    
    // Iterate through controllers, grabbing controller name (contr) and data (contrData)
    for (const [contr, contrData] of Object.entries(controllers)){ 

        // Add controller to index.js, and push to the controller list
        indexTxt += `import ${contr} from './${contr}.js';\n`;
        contrList.push(contr);

        // Initialize route text
        let text = 
        `${header}
        \nimport ${contr} from '../controllers/${contr}/index.js';`;


        // Iterate through the controller data, grabbing the route and route data
        for (const [route, routeData] of Object.entries(contrData)) {
            
            // Add to route text
            text += 
            `\n\n// ${routeData['desc']}
            router.get('/${route}${makePaths(routeData['params'])}', (req, res) => {
                return recipe.${route}(${makeParams(routeData['reqArgs'])}, res)
            });`

        }

        // Add the footer
        text += '\n\nexport default router;'

        // Write the file
        await writeFile(`./routes/${contr}.js`, text);
        
    }
    
    // Add the export defaults to index.js
    indexTxt += 
    `\nexport default {
        ${contrList.join(',\n')}
    }`

    // Write the file
    await writeFile('./routes/index.js', indexTxt);

};

// Make paths for router
//             v-------------------v
// router.get('/getRecipe/:recipeID', (req, res) => {
function makePaths(path){

    // If no path is specified, return an empty path
    if (path === undefined) return '/';

    // If a path is specified
    else {
        // Split the paths
        let paths = path.split(', ')
        let txt = ''

        // Then add each path in sequence 
        for (let p in paths){
            txt += `/:${paths[p]}`
        }

        // Return paths
        return txt;
    }
}

// Make the parameters passthrough
//                           v--------v
// return recipe.parseRecipe(req.params, res)
function makeParams(params){

    // If no specific passthrough is specified, return with all params
    if (params === undefined || params === '') return 'req.params';

    // If a specific passthrough is specified:
    else {
        // Split params and make empty text
        let param = params.split(', ')
        let txt = '{'

        // Iterate through parameters
        for (let p in param){

            // Remove spaces and split by either : or = 
            let splitParams = param[p].replaceAll(' ','').split(/[:=]+/)

            // Add to params
            txt += `${splitParams[0]}: ${splitParams[1]}`
        }

        // Return parameter list
        return (txt + '}');
    }
}


generateRoutes();
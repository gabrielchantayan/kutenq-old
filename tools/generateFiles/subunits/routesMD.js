'use strict'

import { readFile, writeFile } from 'fs/promises';
import * as routes from '../../../routes/routes.json' assert { type: 'json' };
import { writeDocFile } from '../../docs/writeDoc.js';
 


// Load generate errors
async function generateRouteMD() {
  
    // Create the empty error file
    let routeFile = ""

    // Iterate through categories
    for (const [cat, routeList] of Object.entries(routes['default'])) {

        // Add key to error file text
        routeFile += `\n\n# ${cat.toUpperCase()}`

        // Iterate through errors
        for (const [id, route] of Object.entries(routeList)) {

            routeFile += `\n\n### ${route.name}\n\n`
            routeFile += `**DESCRIPTION:** ${route.desc}\n\n`
            routeFile += `**METHOD:** ${route.method}\n\n`
            routeFile += `**TEMPLATE:**\n\n`
            routeFile += `\`\`\`${route.method} /api/${cat}/${id}/${route.params.split(', ').join('/')}\`\`\``

            routeFile += '---\n'

        }

    }

    await writeDocFile('Routes', routeFile);

};

export { generateRouteMD }
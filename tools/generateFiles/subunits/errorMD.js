'use strict'

import { readFile, writeFile } from 'fs/promises';
import * as errors from '../../../utils/misc/errors/errors.json' assert { type: 'json' };
import { writeDocFile } from '../../docs/writeDoc.js';
 


// Load generate errors
async function generateErrorList() {
  
    // Create the empty error file
    let errorFile = ""

    // Iterate through categories
    for (const [cat, errorList] of Object.entries(errors['default'])) {

        // Add key to error file text
        errorFile += `\n\n# ${cat.toUpperCase()}`

        // Iterate through errors
        for (const [id, error] of Object.entries(errorList)) {

            errorFile += `\n\n\`### ${cat}.${id}\`  ${error.name}\n\n`
            errorFile += `**NOTES:** ${error.notes}\n\n`
            
            if (error.keywords != undefined && error.keywords[0] != ""){
                errorFile += `**KEYWORDS:** ${error.keywords.join(', ')}\n\n`
            }

            errorFile += '---\n'

        }

    }

    await writeDocFile('Errors', errorFile);

};

export { generateErrorList }
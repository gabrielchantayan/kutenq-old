'use strict'

import { readFile, writeFile } from 'fs/promises';
import * as errors from '../utils/misc/errors/errors.json' assert { type: 'json' };
// Load generate errors
async function generateErrorList() {
  
    let errorFile = ""

    // Iterate through categories
    for (const [cat, errorList] of Object.entries(errors['default'])) {

        // Add key to error file text
        errorFile += `### ${cat.toUpperCase()}`

        // Iterate through errors
        for (const [id, error] of Object.entries(errorList)) {

            errorFile += `\n\n\`${cat}.${id}\`  ${error.name}\n\n`
            errorFile += `**NOTES:** ${error.notes}\n\n`
            
            if (error.keywords != undefined && error.keywords[0] != ""){
                errorFile += `**KEYWORDS:** ${error.keywords.join(', ')}\n\n`
            }

        }

    }

    await writeFile('./ERRORS.md', errorFile);

};

generateErrorList()

export { generateErrorList }
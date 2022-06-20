'use strict'

import { readFile, writeFile } from 'fs/promises';

// Load generate errors
async function generateErrors() {

    // Read the file
    const data = await readFile('./utils/misc/errors/errors.txt', 'utf8')

    // Fix spaces and split by line
    var dataArray = data.replaceAll("�", " ").split(/\r?\n/);
    
    // Create empty array
    let errors = {}

    // Iterate through data
    for (let i = 1; i < dataArray.length; i++) {

        // Holding variable, split data by tabs
        let cash = dataArray[i].split('\t');

        // Check if errors has category,
        // If not then create it
        if (!errors.hasOwnProperty(cash[0].split('.')[0])){
            errors[cash[0].split('.')[0]] = {}
        }

        // Check if there are keywords
        let keywords = (cash[3] === undefined ? [] : cash[3].split(', '))


        errors[cash[0].split('.')[0]][cash[0].split('.')[1]] = {
            "name" : cash[1],
            "notes" : cash[2],
            "keywords" : keywords
        }

    }

    await writeFile('./utils/misc/errors.json', JSON.stringify(errors, null, 4));

};

generateErrors()

export { generateErrors }
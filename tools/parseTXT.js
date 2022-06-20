'use strict'

import { readFile } from 'fs/promises';


async function parseTXT(filePath) {

    // Read the file
    const data = await readFile(filePath, 'utf8')

    // Fix spaces and split by line
    var dataArray = data.replaceAll("�", " ").split(/\r?\n/);
    
    // Create empty array
    let parsedData = []

    // Iterate through data
    for (let i = 0; i < dataArray.length; i++) {

        // Holding variable, split data by tabs
        let cash = dataArray[i].split('\t');

        // Check if line has more than one entry and has data
        if(cash.length > 1 && cash.slice(1).join('') != ""){     

            parsedData.push(cash)

        }
    }

    return parsedData

};

export { parseTXT }
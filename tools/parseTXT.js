'use strict'

import { readFile } from 'fs/promises';


async function toArray(filePath) {

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

// Load generate errors
async function toJSON(filePath) {

    // Read the file
    const data = await readFile(filePath, 'utf8')

    // Fix spaces and split by line
    var dataArray = data.replaceAll("�", " ").split(/\r?\n/);
    
    // Create empty array
    let parsedData = {}

    // Iterate through data
    for (let i = 1; i < dataArray.length; i++) {

        // Holding variable, split data by tabs
        let cash = dataArray[i].split('\t');

        // Check if errors has category,
        // If not then create it
        if (!parsedData.hasOwnProperty(cash[0].split('.')[0])){
            parsedData[cash[0].split('.')[0]] = {}
        }

        // Check if there are keywords
        let keywords = (cash[3] === undefined ? [] : cash[3].split(', '))


        parsedData[cash[0].split('.')[0]][cash[0].split('.')[1]] = {
            "name" : cash[1],
            "notes" : cash[2],
            "keywords" : keywords
        }

    }

    // await writeFile('./utils/misc/errors/errors.json', JSON.stringify(errors, null, 4));

};


export { toArray }
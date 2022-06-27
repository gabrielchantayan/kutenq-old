'use strict'

import { readFile } from 'fs/promises';
import { deepMerge } from '../../utils/misc/misc.js';

const jsonParentRegex = /"{(.+)}"\s?:\s?{/gm
const jsonTemplateRegex = /{(.+)}/gm
const jsonReplaceRegex = /map['$1']/

let map = `{
    "{Controller}" : {
        "{Function}" : {
            "name" : "{Name}",
            "desc" : "{Description}",
            "method" : "{Method}",
            "function" : "{Function}",
            "params" : "{Params}",
            "reqArgs" : "{Function req args}"
        }
    }
}`

async function toArray(filePath) {

    // Read the file
    const data = await readFile(filePath, 'utf8')

    // Fix spaces and split by line
    var dataArray = data.replaceAll("�", " ").split(/\r?\n/);

    dataArray.forEach((e,i) =>{
        dataArray[i] = e.split('\t');
    })
    
    // Create empty array
    let parsedData = []

    // Iterate through data
    for (let i = 0; i < dataArray.length; i++) {

        // Check if line has more than one entry and has data
        if(isValid(dataArray[i])){     
            parsedData.push(dataArray[i])
        }
    }

    return parsedData

};


/*

structure = {
    "{Controller}" : {
        "{Function}" : {
            "name" : "{Name}",
            "desc" : "{Description}",
            "method" : "{Method}",
            "function" : "{Function}",
            "params" : "{Params}",
            "reqArgs" : "{Function req args}"
        }
    }
}


*/



function generateJSON(rawValues, map){
    
    function titleReplacer(str, p1) {
        return `"${rawValues[p1].charAt(0).toLowerCase() + rawValues[p1].slice(1)}":{`;
    }
    function bodyReplacer(str, p1) {
        return rawValues[p1] || "";
    }

    let result = {}

    let m = map.replaceAll(jsonParentRegex, titleReplacer)

    
    m = m.replaceAll(jsonTemplateRegex, bodyReplacer)
    
    result=JSON.parse(m)

    return result;
}




// Load generate errors
async function toJSON(filePath, structure) {

    // Read the file
    const rawData = await readFile(filePath, 'utf8')

    // Fix spaces and split by line
    var cleanData = rawData.replaceAll("�", " ").split(/\r?\n/);


    cleanData.forEach((e, i) => {
        cleanData[i] = e.split('\t')
    })

    
    // Create empty array for titled data
    let titledData = []

    let headers = 
    cleanData.find(element => {
        return isValid(element);
    });
    
    // Iterate through data
    for (let i = 0; i < cleanData.length; i++) {
        // Check if line has more than one entry and has data
        if(isValid(cleanData[i]) && cleanData[i] != headers){     

            titledData[i] = {}

            cleanData[i].forEach((data, index) => {
                titledData[i][headers[index]] = data
            });
        }
    }

    // Messy array
    let messyArray = []
    let cleanArray = {}

    titledData.forEach((i) => {
        cleanArray = deepMerge(cleanArray, generateJSON(i, structure))
    })

    return cleanArray
};


function isValid(element){
    return (element.length > 1 && element.slice(1).join('') != "")
}

export { toArray, toJSON }
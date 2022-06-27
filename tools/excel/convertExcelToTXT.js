import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';



let defaultParameters = {
    'file' : './tools/excel/Misc.xlsx',
    'sheets' : 'all',
    'savePath' : './tools/excel/',
    'saveName' : undefined
}

// Set XLSX to use fs variable
XLSX.set_fs(fs);


// Function to write a file
async function writeSheet(sheet, name, path=defaultParameters['savePath']){

    // Convert the sheet to a Tab-delimited text file
    let txt = XLSX.utils.sheet_to_csv(sheet, {FS:'\t'});

    

    // And write the file
    await writeFile(`${path}${name}.txt`, txt);
}

// put this in some kinda wrapper function
// for when called from npm run
// bc this is such bs


// Main function
async function main(args, useNodeArgs = true){
    
    let defParams = {
        'file' : './tools/excel/Misc.xlsx',
        'sheets' : 'all',
        'savePath' : './tools/excel/',
        'saveName' : undefined
    }

    // // Explicitly state that useNodeArgs has to be true since the args can mess up the function
    // if (useNodeArgs != false){
    //     args = {}
        
    //     // Get the file to read from the CMD line args, if none exists then default to the function
    //     args['file'] = (process.argv[2] === undefined) ? dFileToRead : process.argv[2]

    //     // Get the sheet to read from the CMD line args, if none exists then default to the function
    //     sheetToProcess = (process.argv[3] === undefined) ? dSTP : process.argv[3]
        
    //     // Get the path to save to the CMD line args, if none exists then default to the function
    //     path = (process.argv[4] === undefined) ? dPath : process.argv[4]
    // } else {
    //     fileToRead = `${dFileToRead}`;
    //     sheetToProcess = dSTP;
    //     path = `${dPath}`;
    // }
    
    // Read excel workbook
    var workbook = XLSX.readFile(args['file']);

    // If processing all sheets,
    if (args['sheets'] == "all"){
        // Iterate through sheets and...
        for (let sheet in workbook.Sheets){
            // Write the sheet
            await writeSheet(workbook.Sheets[sheet], sheet, args['savePath'])
        }
    } 
    // If processing a single sheet, then write the sheet
    else {

        let name = (args['saveName'] === undefined) ? args['sheets'] : args['saveName']

        await writeSheet(workbook.Sheets[args['sheets']], name, args['savePath'])
    }
}

main(defaultParameters, true);

export { main }
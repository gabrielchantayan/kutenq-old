import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';

// Set XLSX to use fs variable
XLSX.set_fs(fs);


// Function to write a file
async function writeSheet(sheet, name, path='./tools/excel/'){

    // Convert the sheet to a Tab-delimited text file
    let txt = XLSX.utils.sheet_to_csv(sheet, {FS:'\t'});

    // And write the file
    await writeFile(`${path}${name}.txt`, txt);
}

// Main function
async function main(dFileToRead = './tools/excel/Misc.xlsx', dSTP = 'all', dPath = './tools/excel/'){
    
    // Get the file to read from the CMD line args, if none exists then default to the function
    let fileToRead = (process.argv[2] === undefined) ? dFileToRead : process.argv[2]

    // Get the sheet to read from the CMD line args, if none exists then default to the function
    let sheetToProcess = (process.argv[3] === undefined) ? dSTP : process.argv[3]
    
    // Get the path to save to the CMD line args, if none exists then default to the function
    let path = (process.argv[4] === undefined) ? dPath : process.argv[4]



    // Read excel workbook
    var workbook = XLSX.readFile(fileToRead);

    // If processing all sheets,
    if (sheetToProcess == "all"){
        // Iterate through sheets and...
        for (let sheet in workbook.Sheets){
            // Write the sheet
            await writeSheet(workbook.Sheets[sheet], sheet, path)
        }
    } 
    // If processing a single sheet, then write the sheet
    else {
        await writeSheet(workbook.Sheets[sheetToProcess], sheetToProcess, path)
    }
}

main();

export { main }
import * as dotEnvs from './defaultDotEnvs.js';
import * as errorJSON from './errorJSON.js';
import * as errorMD from './errorMD.js';
import * as excelTXT from '../convertExcelToTXT.js';


export async function main(){

    let func = process.argv[2]

    switch (func){

        case "errorJSON":
            console.log('Generating Errors...')
            errorJSON.generateErrors();
            break;
        
        case "errorMD":
            console.log('Generating ERRORS.md...')
            errorMD.generateErrorList();
            break;

        case "dotEnvs":
            console.log('Generating .env...')
            dotEnvs.generateDotEnv();
            console.log('Updating .env.dev...')
            dotEnvs.updateDevEnvs();
            break;

        case "all":
            await generateTXTs();
            
            console.log('Generating Errors...')
            await errorJSON.generateErrors();

            console.log('Generating ERRORS.md...')
            await errorMD.generateErrorList();

            console.log('Generating .env...')
            dotEnvs.generateDotEnv();
            console.log('Updating .env.dev...')
            dotEnvs.updateDevEnvs();

            break;

        default:
            console.log('Unknown function. Check \'tools/generateFiles/generate.js\' for more info')
            break;
    }
}


async function generateTXTs(){
    console.log('Extracting Excel data...')

    // dotenvs and routes
    await excelTXT.main('./tools/excel/Misc.xlsx', 'all', './tools/excel/');

    // errors
    await excelTXT.main('./utils/misc/errors/errors.xlsx', 'Combined', './misc/errors/', 'errors.txt');

}

main();
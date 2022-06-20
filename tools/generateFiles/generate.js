import * as dotEnvs from './defaultDotEnvs.js';
import * as errorJSON from './errorJSON.js';
import * as errorMD from './errorMD.js';

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

main();
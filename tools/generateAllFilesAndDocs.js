import * as dotEnv from './generateDefaultDotEnv.js';
import * as errorJSON from './generateErrors.js';
import * as errorMD from './generateErrorList.js';

export function main(){

    // Generate dotEnvs
    dotEnv.generateDotEnv();
    dotEnv.updateDevEnvs();

    // Generate the errors JSON file
    await errorJSON.generateErrors();

    // Generate the errors doc file
    await errorMD.generateErrorList();
}

main();
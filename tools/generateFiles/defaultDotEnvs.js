import { readFile, writeFile } from 'fs/promises';
import { toArray } from '../parseTXT.js';


// Load generate errors
async function generateDotEnv() {

    let input = await toArray('./tools/excel/dotenvs.txt')

    let denv = ""

    let catsDone = []

    // Iterate through dotenv TXT
    for (let i = 1; i < input.length; i++) {

        // Shorthanding
        let x = input[i];

        // Check if category has already been added, if not then add it
        if (!catsDone.includes(x[0].toLowerCase())){
            denv += `#===[ ${x[0].toUpperCase()} ]===#\n`
            catsDone.push(x[0].toLowerCase());
        }

        denv += `${x[1].toUpperCase()} = ${x[3].toLowerCase()}\t\t# ${x[2]}\n`

    }

    await writeFile('./.env', denv);

};

async function updateDevEnvs(){

    const input = await toArray('./tools/excel/dotenvs.txt')
    const currentdevenv = await readFile('./.env.dev', 'utf8')

    let splitDevEnv = currentdevenv.split('\n');
    let parsedDevEnv = []
    let parsedDefault = []
    let devKeys = []
    let denvText = ""

    // Remove non-env lines
    for (let i in splitDevEnv){
        if (splitDevEnv[i].includes(' = ')){

            // Remove any tabs or comments and add values to parsed devEnv
            let cless = splitDevEnv[i].replaceAll('\t','').split('#')[0].split(' = ');

            parsedDevEnv.push([cless[0].toUpperCase(), cless[1].toLowerCase()]);
            devKeys.push(cless[0].toUpperCase())
        }
    }

    // Consolidate input
    for (let i = 1; i < input.length; i++){
        parsedDefault.push([input[i][1].toUpperCase(), input[i][3].toLowerCase()])
    }


    // Combine
    for (let i in parsedDefault){
        if (!devKeys.includes(parsedDefault[i][0])){
            parsedDevEnv.push(parsedDefault[i])
        }
    }

    // Text
    for (let i in parsedDevEnv){
        denvText += `${parsedDevEnv[i][0]} = ${parsedDevEnv[i][1]}\n`
    }

    await writeFile('./.env.dev', denvText);

}

export { generateDotEnv, updateDevEnvs}
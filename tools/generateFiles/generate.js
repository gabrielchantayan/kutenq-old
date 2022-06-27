import * as dotEnvs from './subunits/defaultDotEnvs.js';
import * as errorJSON from './subunits/errorJSON.js';
import * as errorMD from './subunits/errorMD.js';
import * as routers from './subunits/routers.js';
import * as excelTXT from '../excel/convertExcelToTXT.js';


const handler = {
    convertExcel : async function(){
        console.log('Extracting Excel data...')

        // dotenvs and routes
        await excelTXT.main({
            'file' : './tools/excel/Misc.xlsx',
            'sheets' : 'all',
            'savePath' : './tools/excel/outputs/',
            'saveName' : undefined
        }, false);

        // errors
        await excelTXT.main({
            'file' : './utils/misc/errors/errors.xlsx',
            'sheets' : 'Combined',
            'savePath' : './utils/misc/errors/',
            'saveName' : 'errors'
        }, false)
    },

    errorJSON : async function() {
        console.log('Generating Errors...')
        errorJSON.generateErrors();
    },

    errorMD : async function(){
        console.log('Generating ERRORS.md...')
        errorMD.generateErrorList();
    },

    dotEnvs : function (){
        console.log('Generating .env...')
        dotEnvs.generateDotEnv();
        console.log('Updating .env.dev...')
        dotEnvs.updateDevEnvs();
    },

    routes : async function(){
        console.log('Converting Excel')
        await excelTXT.main({
            'file' : './tools/excel/Misc.xlsx',
            'sheets' : 'routes',
            'savePath' : './tools/excel/outputs/',
            'saveName' : 'routes'
        }, false);

        console.log('Generating routes files and folders...')
        await routers.generateRoutes();
    },
}



export async function main(){

    let func = process.argv[2]

    switch (func){

        case "errorJSON":
            handler.errorJSON()
            break;
        
        case "errorMD":
            handler.errorMD();
            break;

        case "dotEnvs":
            handler.dotEnvs();
            break;

        case "routes":
            await handler.routes();
            break;

        case "all":
            handler.convertExcel()
            .then(handler.errorJSON())
            .then(handler.errorMD())
            .then(handler.dotEnvs)
            break;

        default:
            console.log('Unknown function. Check \'tools/generateFiles/generate.js\' for more info')
            break;
    }
}

main();
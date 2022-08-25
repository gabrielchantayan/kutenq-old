// Module imports
import 'dotenv/config'  // DotEnv
import { stringToBool } from './misc.js'

// DotEnvs
const doesLogPrefixes   =  stringToBool(process.env.LOG_PREFIXES)
const doesLogDebug      =  stringToBool(process.env.LOG_DEBUG)
const doesLogFS         =  stringToBool(process.env.LOG_FS)
const doesLogAxios      =  stringToBool(process.env.LOG_AXIOS)
const doesLogDB         =  stringToBool(process.env.LOG_DB)


// // Convert dotenv to bool.
// function denvTruthy(process){

//     let evald = (process === 'true')

//     return (evald || false);
// }


function logDebug(text) {
    if (doesLogDebug == true) console.log(genMsg('debug', text));
}

function logAxios(text) {
    if (doesLogAxios == true) console.log(genMsg('axios', text));
}

function logDB(text) {
    if (doesLogDB == true) console.log(genMsg('database', text));
}

function logFS(text) {
    if (doesLogFS == true) console.log(genMsg('i/o', text));
}

function axiosStatus(url, status) {
    if (doesLogAxios == true) console.log(genMsg('axios', `Status ${status} returned from ${url}`));
}


function genMsg(type, text) {
    if (doesLogPrefixes == true){
        return `[${type.toUpperCase()}] ${text}`
    } else { return text }
    return (doesLogPrefixes == true ? `[${type.toUpperCase()}] ${text}` : text)
}

export { logDebug, logAxios, axiosStatus, logDB, logFS }
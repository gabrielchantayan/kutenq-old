// Module imports
import 'dotenv/config'  // DotEnv


// DotEnvs
const doesLogPrefixes   =  denvTruthy(process.env.LOG_PREFIXES)
const doesLogDebug      =  denvTruthy(process.env.LOG_DEBUG)
const doesLogFS         =  denvTruthy(process.env.LOG_FS)
const doesLogAxios      =  denvTruthy(process.env.LOG_AXIOS)

// Convert dotenv to bool.
function denvTruthy(process){

    let evald = (process === 'true')

    return (evald || false);
}


function logDebug(text) {
    if (doesLogDebug == true) console.log(genMsg('debug', text));
}

function logAxios(text) {
    if (doesLogAxios == true) console.log(genMsg('axios', text));
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

export { logDebug, logAxios, axiosStatus }
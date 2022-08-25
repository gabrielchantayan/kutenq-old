import * as misc from './misc.js'
import * as api from './api.js'


async function getLocale(){
    return api.get(['locale', 'getLocale', 'ru'])
}


/**
 * Reads a locale
 * @param {Object} locale 
 * @param {String} prop Format category.locale 
 * @returns 
 */
function readLocale(locale, prop){
    
    // If the locale is empty return the locale string
    if (Object.keys(locale).length == 0) return prop;


    // Get the property from string
    let res = misc.getProperty(locale, prop);

    // If no locale exists return the prop
    if (res == '' || res == undefined) return prop;
    // Else return the string
    else return res;


}


export { getLocale, readLocale }
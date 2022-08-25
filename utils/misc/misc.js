const unicodeFractions = [["¼","1/4"],["½","1/2"],["¾","3/4"],["⅐","1/7"],["⅑","1/9"],["⅒","1/10"],["⅓","1/3"],["⅔","2/3"],["⅕","1/5"],["⅖","2/5"],["⅗","3/5"],["⅘","4/5"],["⅙","1/6"],["⅚","5/6"],["⅛","1/8"],["⅜","3/8"],["⅝","5/8"],["⅞","7/8"],["⅟","1"],["↉","0"]]

// Deep merge copied from
// https://blog.devgenius.io/how-to-deep-merge-javascript-objects-12a7235f5573
// God damn was that a life-saver.
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
        }
    }

    return deepMerge(target, ...sources);
}

/**
 * Turns a string into camel case
 * @param {String} str Input string
 * @returns Camelized string
 */
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

/**
 * Normalizes a unicode fraction
 * @param {String} str Input unicode fraction
 * @returns Outputted fraction 
 */
function normalizeFraction(str){

    unicodeFractions.forEach(el => str=str.replaceAll(el[0], el[1]))

    return str

}

/**
 * Tests if an array contains a string
 * @param {String} str String to test for
 * @param {Array} arr Array
 * @returns True/False
 */
function containsStringInArray(str, arr){
  return arr.some(el => str.includes(el)) ? true : false;
}

/**
 * Gets a property of an object from a string
 * @param {Object} obj The object to grab from
 * @param {String} prop The property (i.e. foo.bar.baz)
 * @returns 
 */
function getProperty(obj, prop) {
    if (typeof obj !== 'object') throw 'getProp: obj is not an object'
    if (typeof prop !== 'string') throw 'getProp: prop is not a string'

    // Replace [] notation with dot notation
    prop = prop.replace(/\[["'`](.*)["'`]\]/g,".$1")

    return prop.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj || self)
}

/**
 * Gets an enviroment variable
 * @param {*} dotenv Enviroment variable
 * @param {*} options Options (defaultValue, crashIfNotExist)
 * @returns 
 */
function getDotEnv (dotenv, options) {

    if (options.hasOwnProperty('defaultValue')){
        return dotenv || options['defaultValue'];
    }

    else if (options.hasOwnProperty('crashIfNotExist')){
        return dotenv
    }

    else {
        return dotenv
    }
}


// Convert dotenv to bool.
function stringToBool(str){
    let evaluated = (str === 'true')
    return (evaluated || false);
}



export { deepMerge, camelize, normalizeFraction, getProperty, stringToBool, getDotEnv }
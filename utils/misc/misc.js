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

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function normalizeFraction(str){

    unicodeFractions.forEach(el => str=str.replaceAll(el[0], el[1]))

    return str

}

function containsStringInArray(str, arr){
  return arr.some(el => str.includes(el)) ? true : false;
}

export { deepMerge, camelize, normalizeFraction }
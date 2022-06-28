import { toArray, mapToJSON } from '../../excel/parseTXT.js'
import { camelize } from '../../../utils/misc/misc.js'

let map = `{
    "{Locale}" : {
        "{Function}" : {
            "name" : "{Name}",
            "desc" : "{Description}",
            "method" : "{Method}",
            "function" : "{Function}",
            "params" : "{Params}",
            "reqArgs" : "{Function req args}"
        }
    }
}`

let newHeader = [
    'Locale',
    'Category',
    'Name',
    'Value'
]

let regexFlags = /([a-zA-Z]*)$/

async function generateRegex(){
    const reg = await toArray('./tools/excel/outputs/localizedRegex.txt');

    let newArr = [];

    newArr.push(newHeader);

    let gend = {}

    for (let i = 1; i < reg.length; i++){
        newArr.push([
            `${reg[i][0]}${reg[i][1] == '' ? '' : '-'+reg[i][1].toUpperCase()}`,
            camelize(reg[i][2]),
            reg[i][3],
            toRegex(reg[i][4])
        ])
    }

    console.log(newArr)
    

}


function toRegex(input){
    let flags;
    let substr = 0;

    input = input.replace(/(^"|"$)/g, '')

    if (regexFlags.test(input)) {
        flags = input.match(regexFlags)[1];
        substr = input.match(regexFlags)['index'] - 1
    } else {
        flags = '';
    }

    let sl = input.slice(1, substr)
    console.log(input)

    if (substr > 0){
        return new RegExp(input.slice(1, substr), flags)
    } else {
        return new RegExp(input.slice(1, -1))
    }
}

export { generateRegex }
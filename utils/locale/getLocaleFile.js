import { readFile } from 'fs/promises';
import * as errors from '../misc/errors/error.js'
import { logDebug } from '../misc/logger.js'

export default async function getLocaleFile(locale){
    
    // If there is no locale specified, first try to set it to what the dotenv says.
    // If nothing in dotenv, set to english
    locale = locale || process.env.DEFAULT_LOCALE || "en";

    logDebug(`Locale variable: ${locale}\nProcess.ENV locale: ${process.env.DEFAULT_LOCALE}`)

    try {
        const localeFile = await readFile(`./locales/${locale}.json`, 'utf8')


        return JSON.parse(localeFile)
    } catch (error) {
        console.log(error)
        errors.returnMessage('locale.1')
        return {}
    }


}



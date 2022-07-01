import * as axios from '../../middleware/axiosWrapper.js';
import { logAxios, axiosStatus } from '../misc/logger.js';
import { testAndFixURL } from './urlTools.js';
import * as cheerio from 'cheerio';


/**
 * Function to get a webpage from a given URL
 * @param  {string} url The URL of the webpage to get
 * @return  {string} The HTML of the webpage in a string 
 */
async function getWebpage(url) {

    // Parse the URL
    let parsedUrl = testAndFixURL(url)    

    // Axios request
    const res = await axios.get(parsedUrl);

    // Return
    return res;
}


/**
 * Function to get LD+JSON schemas from a page
 * @param  {string} url The URL of the webpage to get schemas from
 * @return {JSON} The LD+JSON of the webpage
 */
async function getSchemas(url){
    
    // Get the webpage
    const webpage = await getWebpage(url);

    // Parse the webpage
    const $ = cheerio.load(webpage);
    
    return JSON.parse($('*[type="application/ld+json"]').html())
}



// Get printable version of a page
async function getPrintablePage() {}

export { getWebpage, getSchemas }
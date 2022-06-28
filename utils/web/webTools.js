import * as axios from '../../middleware/axiosWrapper.js';
import { logAxios, axiosStatus } from '../misc/logger.js';
import { testAndFixURL } from './urlTools.js';
import * as cheerio from 'cheerio';

// Get website
async function getWebpage(page) {

    // Parse the URL
    let parsedURL = testAndFixURL(page)    

    // Axios request
    const res = await axios.get(parsedURL);

    // Return
    return res;
}


// Get Schemas
async function getSchemas(page){
    
    // Get the webpage
    const webpage = await getWebpage(page);

    // Parse the webpage
    const $ = cheerio.load(webpage);
    
    return JSON.parse($('*[type="application/ld+json"]').html())
}



// Get printable version of a page
async function getPrintablePage() {}

export { getWebpage, getSchemas }
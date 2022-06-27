import * as axios from '../../middleware/axiosWrapper.js';
import { logAxios, axiosStatus } from '../misc/logger.js';
import { testAndFixURL } from './urlTools.js';

// Get website
async function getWebpage(page) {

    // Parse the URL
    let parsedURL = testAndFixURL(page)    

    // Axios request
    const res = await axios.get(parsedURL);

    // Return
    return res;
}

// Get printable version of a page
async function getPrintablePage() {}

export { getWebpage }
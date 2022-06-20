import axios from "axios";
import { logAxios, axiosStatus } from '../misc/logger.js';

// REGEX EXPLAINED
// ^ — start of string
// (http) — test for string "http"
// (s?) — optionally test for string "s"
// (:\/\/) — test for "://"
// \b — word boundry
// /gi — Global; Case-insensitive
const urlRegex = /^(http)(s?)(:\/\/)\b/gi


// Test if a string is a URL
function testIfURL(url){
    return urlRegex.test(url)
}

// Test if a string is a URL and if not, turn it in to one
function testAndFixURL(url){
    return (testIfURL(url) ? url : `http://${url}`)
}

// Get website
async function getWebpage(page) {

    let parsedURL = testAndFixURL(page)    

    const res = await axios.get(parsedURL);

    axiosStatus(parsedURL, res.status);

    return res.data;
}

// Get printable version of page


export { getWebpage }
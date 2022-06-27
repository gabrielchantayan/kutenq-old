import axios from "axios";
import { returnMessage } from "../utils/misc/errors/error.js";
import { logAxios, axiosStatus } from '../utils/misc/logger.js';


const errors = {
    "ECONNREFUSED" : 1,
    "ENOTFOUND" : 2
}

async function get(url){

    // Log the GET request
    logAxios(`GET ${url}`)

    // Try
    try {
        // Get the page
        const res = await axios.get(url);

        // Log the status
        axiosStatus(url, res.status);

        // Return data
        return res.data
    } catch (e) {
        return returnMessage(`axios.${errors[e.code]}`);
    }

    
}


export { get }
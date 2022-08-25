import axios from "axios";

// let host = window.location.host
let host = `${window.location.hostname}:3301`
let protocol = window.location.protocol 

// Base API call
const baseURL = `${protocol}//${host}/api/`

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


// API get function
function get(call) {

    if (typeof call === 'object') call = call.join('/') 
    
    try {
        const request = axios.get(`${baseURL}${call}`);
        return request.then(response => response.data.data);
    }
    catch (e) { return ''}
}


export { get }
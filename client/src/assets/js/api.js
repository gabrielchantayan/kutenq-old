import axios from "axios";

let host = window.location.hostname
let protocol = window.location.protocol 

let port = 3301
// Base API call
const baseURL = `${protocol}//${host}/api/`

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


// API get function
function get(call) {
    const request = axios.get(`${baseURL}${call}`);
    return request.then(response => response.data.data);
}


export { get }
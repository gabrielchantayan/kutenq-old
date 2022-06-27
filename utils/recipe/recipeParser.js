import * as webTools from '../web/webTools.js';


async function url (url) {
    
    const data = await webTools.getWebpage(url)

    return data;

}

export { url }
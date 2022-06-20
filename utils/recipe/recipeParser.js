import * as axiosWrapper from '../axios/axiosWrapper.js';


async function url (url) {
    
    const data = await axiosWrapper.getWebpage(url)

    return data;

}

export { url }
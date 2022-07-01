// REGEX EXPLAINED
// ^ — start of string
// (http) — test for string "http"
// (s?) — optionally test for string "s"
// (:\/\/) — test for "://"
// \b — word boundry
// /gi — Global; Case-insensitive
const urlRegex = /^(http)(s?)(:\/\/)\b/gi


/**
 * Test if a string is a URL
 * @param  {string} url
 * @return  {boolean} TRUE if is url, FALSE if not
 */
function testIfURL(url){
    return urlRegex.test(url)
}


/**
 * Test if a given string is a URL and if not, turn it in to one
 * @param  {string} url
 * @return  {string} 
 */
function testAndFixURL(url){
    return (testIfURL(url) ? url : `http://${url}`)
}



// Get printable version of page


export { testIfURL, testAndFixURL }
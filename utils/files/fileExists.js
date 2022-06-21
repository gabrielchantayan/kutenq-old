import { access, mkdir } from 'fs/promises'

// Check if a file exists
async function check(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
};


// Check if a file exists and if not then create it
async function checkAndCreateDir(dir) {
    // Check if file already exists
    let dirExists = false;

    // Docker is being strange so try/catch it
    try { dirExists = await check(dir); }
    catch (e) { console.log(e); dirExists = false; }

    // If not, create it
    if (!dirExists) {
        logCreate(`Creating ${dir}...`);
        
        try {
            const createDir = await mkdir(dir, { recursive: true });
            console.log(`created ${createDir}`);
        } catch (e) {
            console.log(e.message)
        }

    }
}




export { check, checkAndCreateDir };
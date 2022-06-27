import { writeFile } from "fs/promises";

async function writeDocFile(file, data){
    await writeFile(`./kutenq-backend.wiki/${file}.md`, data)
}

export { writeDocFile }
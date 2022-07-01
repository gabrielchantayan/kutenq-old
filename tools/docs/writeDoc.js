import { writeFile } from "fs/promises";

async function writeDocFile(file, data){
    await writeFile(`./kutenq.wiki/${file}.md`, data)
}

export { writeDocFile }
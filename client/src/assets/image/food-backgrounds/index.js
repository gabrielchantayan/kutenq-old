import sm1 from './1-375.jpeg';
import md1 from './1-750.jpeg';
import sm2 from './2-375.jpeg';
import md2 from './2-750.jpeg';
import sm3 from './3-375.jpeg';
import md3 from './3-750.jpeg';
import sm4 from './4-375.jpeg';
import md4 from './4-750.jpeg';
import sm5 from './5-375.jpeg';
import md5 from './5-750.jpeg';
import sm6 from './6-375.jpeg';
import md6 from './6-750.jpeg';
import sm7 from './7-375.jpeg';
import md7 from './7-750.jpeg';
import sm8 from './8-375.jpeg';
import md8 from './8-750.jpeg';
import sm9 from './9-375.jpeg';
import md9 from './9-750.jpeg';
import sm10 from './10-375.jpeg';
import md10 from './10-750.jpeg';
import sm11 from './11-375.jpeg';
import md11 from './11-750.jpeg';
import sm12 from './12-375.jpeg';
import md12 from './12-750.jpeg';
import sm13 from './13-375.jpeg';
import md13 from './13-750.jpeg';
import sm14 from './14-375.jpeg';
import md14 from './14-750.jpeg';



// https://bulkresizephotos.com/en?preset=true&value=50


let small = [sm1, sm2, sm3, sm4, sm5, sm6, sm7, sm8, sm9, sm10, sm11, sm12, sm13, sm14]
let med = [md1, md2, md3, md4, md5, md6, md7, md8, md9, md10, md11, md12, md13, md14]

function randomSmallImage(){
    return small[Math.floor(Math.random() * small.length)]
}

function randomMedImage(){
    return med[Math.floor(Math.random() * med.length)]
}

export {
    small,
    med,
    randomSmallImage,
    randomMedImage
}
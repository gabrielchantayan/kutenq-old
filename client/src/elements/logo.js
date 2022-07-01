import React from 'react'
import logoSvgCyr from '../assets/image/typeface/kutenq-cyr.svg';
import logoSvgHye from '../assets/image/typeface/kutenq-hye.svg';
import logoSvgLat from '../assets/image/typeface/kutenq-lat.svg';

import { ReactComponent as LogoSvgCyr } from '../assets/image/typeface/kutenq-cyr.svg';
import { ReactComponent as LogoSvgHye } from '../assets/image/typeface/kutenq-hye.svg';
import { ReactComponent as LogoSvgLat } from '../assets/image/typeface/kutenq-lat.svg';


// let logos = {
//     "svg" : {
//         "lat" : logoSvgLat,
//         "hye" : logoSvgHye,
//         "cyr" : logoSvgCyr
//     }
// }


let logos = {
    "svg" : {
        "lat" : <LogoSvgLat className="logo" />,
        "hye" : <LogoSvgHye className="logo" />,
        "cyr" : <LogoSvgCyr className="logo" />
    }
}


export default function Logo(props){

    let script = props.script || "lat"
    // <img className="logo" src={logos["svg"][script]} alt="kutenq! logo" />

    return (
        logos["svg"][script]
    )
}
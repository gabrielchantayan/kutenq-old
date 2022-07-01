import React from 'react'
import * as photos from '../assets/image/food-backgrounds/index.js'


export default function BackgroundWideImage(props){

    let img = props.img || photos.randomMedImage()
    // <img className="logo" src={logos["svg"][script]} alt="kutenq! logo" />

    return (
        <section className="backgroundImage">
            <div style={{backgroundImage: `url("${img}")`}}></div>
        </section>
    )
}
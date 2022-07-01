import React from 'react'
import * as photos from '../assets/image/food-backgrounds/index.js'

export default function FullPageRandomFood(props){

    console.log(photos.randomSmallImage())

    return (
        <section id="fullBackground">
            <div style={{backgroundImage: `url("${photos.randomSmallImage()}")`}}></div>
        </section>
    )
}
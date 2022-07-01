import React from "react";
import RecipePage from "../components/recipePage.js";
import BackgroundWideImage from '../elements/backgroundWideImage.js';
import Header from '../components/header.js'


export default function Recipe(params){
    

    return (
        <section id="recipePage">
            <Header />
            
            <BackgroundWideImage />

            <RecipePage />
        </section>
    )
}
import React from "react";
import RecipePage from "../components/recipePage.js";
import BackgroundWideImage from '../elements/backgroundWideImage.js';
import Header from '../components/header.js'
import LoginCard from "../components/loginCard.js";
import FullPageRandomFood from "../elements/fullPageRandomFood.js";
import RegisterCard from "../components/registerCard.js";


export default function Register(params){
    

    return (
        <section id="registerPage">

            <FullPageRandomFood />

            <RegisterCard />
        </section>
    )
}
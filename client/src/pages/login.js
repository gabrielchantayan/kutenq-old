import React from "react";
import RecipePage from "../components/recipePage.js";
import BackgroundWideImage from '../elements/backgroundWideImage.js';
import Header from '../components/header.js'
import LoginCard from "../components/loginCard.js";
import FullPageRandomFood from "../elements/fullPageRandomFood.js";


export default function Login(params){
    

    return (
        <section id="loginPage">

            <FullPageRandomFood />

            <LoginCard />
        </section>
    )
}
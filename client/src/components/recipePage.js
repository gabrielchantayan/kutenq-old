import BackgroundWideImage from '../elements/backgroundWideImage.js';


export default function RecipePage(params){
    

    return (
        <section id="mainContent">

                <section id="top">
                    <h1 className="recipeTitle"><span>Yummy Recipe</span></h1>
                    <h3 className="subtitle">Rockin Subtitle!</h3>

                    <h1>Ingredients</h1>
                    <ul className="ingredientList">
                        <li>1 tsp cool sauce</li>
                        <li>1 tbsp jammin flour</li>
                        <li>3 cups "fun juice"</li>
                        <li>2 tbsp haha powder <span className="note">tehehe</span></li>
                    </ul>
                </section>


        </section>
    )
}
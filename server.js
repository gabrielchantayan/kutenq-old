// Prereqs
import express from "express"           // Webserver
import routes from './routes/index.js'  // API Routes

// Set up on port 3301
const port = process.env.PORT || 3301;


// Main function
function main () {

    // Setup express webserver
    const app = express();

    // Middleware stuffs
    app.use(express.json());
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }));

    // Listen to API routes
    app.use('/api/recipe', routes.recipe);
    app.use('/api/locale', routes.locale);

    // Open up on port XXXX
    app.listen(port, () => {
        console.log(`Backend live on ${port}`);
    });

}

main()
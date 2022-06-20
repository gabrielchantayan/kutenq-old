# kutenq backend
The backend server for **kutenq**, written in Node.JS with Express

### API Usage
#### Recipes
**Recipe Parsing**

`/api/recipe/parseRecipe/url/:url` Get and parse a recipe from a URL

### Errors
If an error occurs, you can check the meaning in `ERRORS.md`

To export a new `errors.json` file, open up `errors.xlsx`, then export the first sheet as a tab-delimited text file (`.txt`). Run `npm run genErrors`.

To export a new `ERRORS.md` file, run `npm run genErrorFile`.
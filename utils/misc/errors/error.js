import * as errorFile from './errors.json' assert { type: 'json' };

let errors = errorFile['default']

// Returns an error message
function returnMessage(id) {
    // Check if the error exists,
    // If so, return the error
    // If not, return Error -1 (Unknown error)
    return (checkIfErrorExists(id) ? parseError(id) : parseError("general.-1"))
}



// Parse the error message to return
// Sizes are "short" and "full"
// Default value is "full"

// A short error looks like:
// {
//     "Error" : "Unknown error (id 0)"
// }

// A full error looks like:
// {
//     "id" : 0
//     "Error" : "Unknown error"
//     "Notes" : "Unable to determine what went wrong. You should not be getting this error."
// }
function parseError(id, size="full"){
    
    // Split ID into categories
    let error = id.split('.')

    // Create empty variable for the parsed error
    let parsed;

    // Switch error sizes
    // If unknown, default to full
    switch (size){
        case "short":
            parsed = { "Error" : `${errors[error[0]][error[1]]["name"]} (id ${id})` }
            break;

        case "full":
        default: 
            parsed = {
                "id" : id,
                "Error" : errors[error[0]][error[1]]["name"],
                "Notes" : errors[error[0]][error[1]]["notes"]
            }
            break;
    }

    return parsed;

}

function checkIfErrorExists(id){
    id = id.split('.')
    if (errors.hasOwnProperty(id[0]) && errors[id[0]].hasOwnProperty(id[1])) return true;

    return false;
}


export { returnMessage }
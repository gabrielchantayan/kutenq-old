import * as mongoWrapper from '../../middleware/mongoWrapper.js';
import * as utils from '../misc/misc.js';

const dbType = utils.getDotEnv(process.env.DB_TYPE, {'defaultValue': 'mongodb'});

/**
 * Query a database
 * @param {String} table The table to query
 * @param {String} query The query
 * @returns 
 */
async function query(table, query){
    try {
        // Detect the type of database used, then
        // use the appropriate wrapper to contact the DB
        // (future-proofing)
        switch (dbType) {
        case 'mongodb':
            return mongoWrapper.query(table, query);
            break;
        }
    } catch (e) {
        console.log(`An error occurred querying "${query}" from ${table}! \n${e}`)
    }
}


/**
 * Query a database
 * @param {String} table The table to create
 */
async function createTable(table){
    try {
        // Detect the type of database used, then
        // use the appropriate wrapper to contact the DB
        // (future-proofing)
        switch (dbType) {
        case 'mongodb':
            return mongoWrapper.createCollection(table);
            break;
        }
    } catch (e) {
        console.log(`An error creating table "${table}"! \n${e}`)
    }
}



/**
 * Insert an item into a table
 * @param {String} table The table to query
 * @param {Object} item The item to insert
 */
async function insert(table, item){
    try {
        // Detect the type of database used, then
        // use the appropriate wrapper to contact the DB
        // (future-proofing)
        switch (dbType) {
        case 'mongodb':
            return mongoWrapper.insert(table, item);
            break;
        }
    } catch (e) {
        console.log(`An error occurred inserting "${item}" to ${table}! \n${e}`)
    }
}


/**
 * Insert many items into a table
 * @param {String} table The table to query
 * @param {Array} items The items to insert as an array
 */
async function insertMany(table, items){
    try {
        // Detect the type of database used, then
        // use the appropriate wrapper to contact the DB
        // (future-proofing)
        switch (dbType) {
        case 'mongodb':
            return mongoWrapper.insertMany(table, items);
            break;
        }
    } catch (e) {
        console.log(`An error occurred inserting "${items}" to ${table}! \n${e}`)
    }
}




export { query, createTable, insert, insertMany }
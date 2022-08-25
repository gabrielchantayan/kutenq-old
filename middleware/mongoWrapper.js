import { MongoClient } from 'mongodb'
import * as utils from '../utils/misc/misc.js'
import { logDB } from '../utils/misc/logger.js'

const uri = utils.getDotEnv(process.env.MONGO_HOST)
const dbName = utils.getDotEnv(process.env.MONGO_DATBASE, {'defaultValue': 'kutenq'})

const url = `${uri}/${dbName}`

/**
 * Creates a collection
 * @param {String} collection 
 */
async function createCollection(collection){
    // Connect to Mongo client
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        // Create collection
        db.createCollection(collection, function(err, res) {
            if (err) throw err;
            
            // And log it
            logDB(`Collection "${collection}" created!`, 'createTable')

            db.close();
        });
    }); 
}

/**
 * Queries a collection
 * @param {String} collection 
 * @param {String} query 
 */
async function query(collection, query){
    MongoClient.connect(url, function(err,db) {

        logDB(`Querying ${collection} with query: ${query}`, 'queryNotif')

        if(err) throw (err);

        db.collection(collection).find(query).toArray(function (err, result){
            if (err) throw (err);
        
            logDB(`Query returned the following: \n${result}`, 'queryResult')

            return result

        })

    });
}

/**
 * Insert an item into a collection
 * @param {String} collection 
 * @param {Object} item Item to insert
 */
async function insert(collection, item){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection(collection).insertOne(item, function(err, res) {
            if (err) throw err;
            
            logDB(`Inserted 1 item into ${collection}`, 'insertNotif')

            db.close();
        });
    }); 
}


/**
 * Insert multiple items into a collection
 * @param {String} collection 
 * @param {Array} items Items to insert in an array
 */
async function insertMany(collection, items){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection(collection).insertMany(items, function(err, res) {
            if (err) throw err;
            
            logDB(`Inserted ${res.insertedCount} items into ${collection}`, 'insertNotif')

            db.close();
        });
    }); 
}





export { createCollection, query, insert, insertMany}
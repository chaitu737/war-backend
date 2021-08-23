require('dotenv').config();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient
const url = process.env.dbURL
let _db
const connectDB = async (callback) => {
    try {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}
const getDB = () => _db
const disconnectDB = () => _db.close()
module.exports = { connectDB, getDB, disconnectDB }

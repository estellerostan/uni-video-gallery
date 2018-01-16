const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/mbds';

exports.mongoConnection = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        callback(err, db);
    });
};
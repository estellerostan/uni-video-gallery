const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/mbds';

exports.mongoConnection = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        callback(err, db);
    });
};

exports.createVideo = function(formData, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            let reponse = reponse = {
                success: false,
                error: err,
                msg: "ProblÃƒÂ¨me lors de l'insertion, erreur de connexion."
            };
            callback(reponse);
        } else {
            let toInsert = {
                url: formData.url,
                title: formData.title,
                description: formData.description
            };

            const collection = db.collection("videos");

            // Find the video to save
            collection.findOne({url: formData.url}, function(err, item) {
                // if (err) throw err;

                if (item == null) {
                    // we don't have a result
                    collection
                        .insertOne(toInsert, function (err, result) {
                            let response;

                            if (err) {
                                response = {
                                    success: false,
                                    error: err,
                                    msg: "ProblÃƒÂ¨me Ãƒ  l'insertion"
                                };
                            } else {
                                response = {
                                    success: true,
                                    result: result,
                                    error: null,
                                    msg: "Ajout rÃƒÂ©ussi " + result
                                };
                            }
                            callback(response);
                        });
                } else {
                    // we have a result
                    response = {
                        success: false,
                        result: result,
                        msg: "Impossible : la video existe deja "
                    };
                }
            });
        }
    });
};

exports.updateVideo = function(formData, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(-1);
        } else {
            db.collection("videos")
                .updateOne({url: formData.url}, toInsert, function (err, result) {
                    let response;

                    if (err) {
                        response = {
                            success: false,
                            error: err,
                            msg: "ProblÃƒÂ¨me Ãƒ  l'insertion"
                        };
                    } else {
                        response = {
                            success: true,
                            result: result,
                            error: null,
                            msg: "Ajout rÃƒÂ©ussi " + result
                        };
                    }
                    callback(response);
                });
        }
    });
};

exports.deleteVideo = function(formData, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(-1);
        } else {
            db.collection("videos")
                .deleteOne({url: formData.url}, toInsert, function (err, result) {
                    let response;

                    if (err) {
                        response = {
                            success: false,
                            error: err,
                            msg: "Probleme"
                        };
                    } else {
                        response = {
                            success: true,
                            result: result,
                            error: null,
                            msg: "Ajout reussi " + result
                        };
                    }
                    callback(response);
                });
        }
    });
};

exports.listVideos = function(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(-1);
        } else {
            db.collection('videos')
                .find()
                .toArray()
                .then(arr => callback(arr));
        }
    });
};

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
                msg: "Probleme lors de l'insertion, erreur de connexion."
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
                if (err) callback(err);

                let mongoResponse;

                if (item == null) {
                    // we don't have a result
                    collection
                        .insertOne(toInsert, function (err, result) {
                            if (err) {
                                mongoResponse = {
                                    success: false,
                                    error: err,
                                    msg: "Probleme a l'insertion"
                                };
                                callback(mongoResponse);
                            } else {
                                mongoResponse = {
                                    success: true,
                                    result: result,
                                    msg: "Ajout de la video reussi "
                                };
                                callback(mongoResponse);
                            }
                        });
                } else {
                    // we have a result
                    mongoResponse = {
                        success: false,
                        result: item,
                        msg: "Impossible de faire l'ajout : la video existe deja "
                    };
                    callback(mongoResponse);
                }
            });
        }
    });
};

exports.updateVideo = function(formData, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            let reponse = reponse = {
                success: false,
                error: err,
                msg: "Probleme lors de la modification, erreur de connexion."
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
                if (err) callback(err);

                let mongoResponse;

                if (item == null) {
                    // we don't have a result
                    mongoResponse = {
                        success: false,
                        result: item,
                        msg: "Impossible de faire la modification : la video n'existe pas "
                    };
                    callback(mongoResponse);
                } else {
                    // we have a result
                    collection
                        .updateOne({url: formData.url}, {$set: toInsert}, function (err, result) {
                            if (err) {
                                mongoResponse = {
                                    success: false,
                                    error: err,
                                    msg: "Probleme lors de la modification"
                                };
                                callback(mongoResponse);
                            } else {
                                mongoResponse = {
                                    success: true,
                                    result: result,
                                    msg: "Modification de la video reussie "
                                };
                                callback(mongoResponse);
                            }
                    });
                }
            });
        }
    });
};

exports.deleteVideo = function(formData, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(-1);
        } else {
            let toInsert = {
                url: formData.url,
                title: formData.title,
                description: formData.description
            };

            db.collection("videos")
                .deleteOne({url: formData.url}, {$set: toInsert}, function (err, result) {
                    let response;

                    if (err) {
                        response = {
                            success: false,
                            error: err,
                            msg: "Probleme lors de la suppression"
                        };
                        callback(response);
                    } else {
                        response = {
                            success: true,
                            result: result,
                            error: null,
                            msg: "Suppression reussie "
                        };
                        callback(response);
                    }
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

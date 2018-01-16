const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);

const mongoDBModule = require('../app_modules/mongo-api');

// allow cross domain requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Lance le serveur avec express
server.listen(port);

// Test de la connexion à  la base
app.get('/api/connection', function(req, res) {
    mongoDBModule.mongoConnection(function(err, db) {
        let response;

        if(err) {
            console.log("Erreur  de connexion.");
            response = {
                message: "Erreur de connexion à la db."
            }
        } else {
            response = {
                message: "Connexion à la db établie."
            }
        }
        res.send(JSON.stringify(response));

    });
});
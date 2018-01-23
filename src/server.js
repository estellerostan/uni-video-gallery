const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);

const mongoDBModule = require('../app_modules/mongo-api');

// pour les formulaires multiparts
const multer = require('multer');
const multerData = multer();

// allow cross domain requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);

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

//------------------
// ROUTES
//------------------

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données


// Creation d'un'une video par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/video', multerData.fields([]), function(req, res) {
    // On va recuperer les donnÃƒÂ©es du formulaire d'envoi
    // les params sont dans req.body mÃƒÂªme si le formulaire
    // est envoyÃƒÂ© en multipart

    mongoDBModule.createVideo(req.body, function(data) {
        res.send(JSON.stringify(data));
    });
});
const { json } = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const mysql = require('mysql');
require('dotenv').config()
const fetch = require('node-fetch');


// Middleware 
app.use(express.json())

var connection;

function setupConnection(){
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
}

app.get('/affichettes', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Piece', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.get('/affichette/:idAffichette', (req, res) => {
    const id = req.params.idAffichette;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Piece where Piece_id='+id, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})



/*app.get('/t_compte', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from t_compte', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/t_enseignant', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from t_compte inner join t_enseignant on t_compte.id = t_enseignant.id', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/CompteUtilisateur/:idCompte', (req, res) => {
    const id = req.params.idCompte;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from t_compte where id = '+id, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/CompteUtilisateurLogin/:login', (req, res) => {
    const login = req.params.login;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from t_compte where login = "'+login+'"', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/CompteEnseignant/:idEnseignant', (req, res) => {
    const id = req.params.idEnseignant;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT t_enseignant.id as id, nom, prenom, mdp, login, mail from t_enseignant inner join t_compte on t_compte.id = t_enseignant.id where t_enseignant.id = '+id, function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
            
        })
        connection.end();
    })
})

app.get('/CompteAdmin', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from t_administrateur', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.put('/CompteEnseignant/:id', async (req, res) => {
    const id = req.params.id;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('UPDATE t_compte inner join t_enseignant on t_compte.id = t_enseignant.id set login = "'+ req.body.login +'", mdp = "'+ req.body.mdp +'", mail = "'+ req.body.mail +'", nom = "'+ req.body.nom +'", prenom = "'+ req.body.prenom +'" where t_compte.id = ' + id, function (error, results, fields) {
            if (error) throw error;
            res.send("Modification effecté");
            
        })
        connection.end();
    })
})


app.delete('/CompteEnseignant/:id', (req, res) => {
    const id = req.params.id;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('DELETE from t_compte where id = ' + id, function (error, results, fields) {
            if (error) throw error;
        })
        connection.query('DELETE from t_enseignant where id = ' + id, function (error, results, fields) {
            if (error) throw error;
            res.send("Compte supprimé");
        })
        connection.end();
    })
})


app.post('/CompteUtilisateurAjout', async (req, res) => {
    const mdp = req.body.mdp;
    const login = req.body.login;
    const mail = req.body.mail;
    const isadmin = req.body.isadmin;

    if (!mdp || !login || !mail || !isadmin) {
        res.send("Il manque des arguments");
    }

    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");

        connection.query('INSERT into t_compte values ( null, "'+ login +'", "'+ mdp +'", "'+ mail +'", '+ isadmin +')', function (error, results, fields) {
            if (error) throw error;
            if( isadmin != 1 ){
                res.send("Ajout effecté");
            }
        })

        if (isadmin == 1){
            fetch('http://localhost:7251/CompteUtilisateurLogin/' + login)
            .then(response => response.json())
            .then(response => {
                connection.query('INSERT into t_administrateur values ( '+ response.id +')', function (error, results, fields) {
                    if (error) throw error;
                    res.send("Ajout effecté");
                })
            })
        }

        connection.end();
    })

});
*/


app.listen(7251, () => {
    console.log('Serveur à l écoute')
})

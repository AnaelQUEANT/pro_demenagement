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

app.get('/affichette/:idLogement', (req, res) => {
    const id = req.params.idLogement;
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Piece where Logement_id='+id, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.get('/logement', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Logement', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.get('/piece', (req, res) => {
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

app.get('/lesCartons/:idSalle', (req, res) => {
    const id = req.params.idSalle;
        setupConnection();
        connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'left join Piece using (Piece_id) ';
        requete += 'where Carton.Piece_id = ' + id;
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})


app.get('/carton/:idCarton', (req, res) => {
    const id = req.params.idCarton;
        setupConnection();
        connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'left join Carton_has_Equipement using (Carton_id) ';
        requete += 'left join Equipement_Carton using (Equipement_Carton_id) ';
        requete += 'where Carton.Carton_id = ' + id;
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})


app.listen(7251, () => {
    console.log('Serveur à l écoute')
})

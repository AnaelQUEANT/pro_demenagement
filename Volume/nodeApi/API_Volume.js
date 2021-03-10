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



app.get('/mobilier', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Mobilier', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/carton', (req, res) => {
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Carton', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.listen(16501, () => {
    console.log('Serveur à l écoute')
})

/*app.get('/affichette/:idAffichette', (req, res) => {
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
})*/
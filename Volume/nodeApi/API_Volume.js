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



function setupConnection(){
    let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
    return connection;
}



app.get('/mobilier', (req, res) => {
    let connection = setupConnection();
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Type_Mobilier', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.get('/mobilierByPiece/:idSalle', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Type_Mobilier WHERE Piece_id = '+id, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/carton', (req, res) => {
    let connection = setupConnection();
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

app.get('/piece', (req, res) => {
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query("SELECT * from Type_Piece ", function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})


app.get('/typemobilier/:nomPiece', (req, res) => {
    const nom = req.params.nomPiece;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Type_Mobilier inner join Type_Piece where Nom_Piece = '+nom, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.get('/camion', (req, res) => {
    const nom = req.params.nomPiece;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('SELECT * from Camion', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})

app.listen(16501, () => {
    console.log('Serveur à l écoute')
})
const { json } = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Middleware 
var connection;

function setupConnection(){
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
}

app.get('/lesPieces/:idSalle', (req, res) => {
    const id = req.params.idSalle;
    setupConnection();
    connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT Piece.Piece_nom, COUNT(Carton.Carton_id) ';
        requete += 'from Piece left JOIN Carton on Piece.Piece_id = Carton.Piece_id ';
        requete += 'WHERE Piece.Logement_id = ' + id + ' ';
        requete += 'GROUP BY Piece.Piece_id;'
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})


app.listen(16500, () => {
    console.log('Serveur à l écoute')
})

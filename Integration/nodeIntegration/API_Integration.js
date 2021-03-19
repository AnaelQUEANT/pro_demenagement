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

app.get('/affichettes', (req, res) => {
    let connection = setupConnection();
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
    let connection = setupConnection();
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
    let connection = setupConnection();
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

app.get('/lesPieces/:idSalle', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'SELECT Piece.Piece_nom, Piece.Piece_id, COUNT(Carton.Carton_id) as nbCarton ';
        requete += 'from Piece left JOIN Carton on Piece.Piece_id = Carton.Piece_id ';
        requete += 'WHERE Piece.Logement_id = ' + id + ' ';
        requete += 'GROUP BY Piece.Piece_id;'
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/lesCartons/:idSalle', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'left join Piece using (Piece_id) ';
        requete += 'where Carton.Piece_id = ' + id;
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/lesObjets/', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'SELECT * from Equipement_Carton ';
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/infoCarton/:id', (req, res) => {
    const id = req.params.id;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'where Carton.Carton_id = ' + id;
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/getIDCarton/', (req, res) => {
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'select Carton_id from Carton order by Carton_id desc LIMIT 1';
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/objetCarton/:id', (req, res) => {
    const id = req.params.id;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'left join Piece using(Piece_id) ';
        requete += 'left join Carton_has_Equipement using(Carton_id) ';
        requete += 'left join Equipement_Carton using(Equipement_Carton_id) ';
        requete += 'where Carton.Carton_id = ' + id;
        connection.query(requete, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.post('/ajoutEquipementCarton', async (req, res) => {
    const idObjet = req.body.idObjet;
    if (!idObjet) {
        res.send("Il manque des arguments");
    }
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        fetch('http://localhost:16500/getIDCarton/')
            .then(response => response.json())
            .then(response => {
                let connection2 = setupConnection();
                console.log("Id Carton" + response[0].Carton_id);
                connection2.query('INSERT into Carton_has_Equipement values (' + response[0].Carton_id + ', ' + idObjet + ')', function (error, results, fields) {
                    if (error) throw error;
                    res.send("Ajout effecté");
                    connection2.end();
                })
            })

        connection.end();
    })
})

app.post('/ajoutCarton', async (req, res) => {
    const origine = req.body.origine;
    const couleur = req.body.couleur;
    const largeur = req.body.largeur;
    const hauteur = req.body.hauteur;
    const longueur = req.body.longueur;
    const fragile = req.body.fragile;
    const piece = req.body.piece;

    if (!origine || !couleur || !largeur || !hauteur || !longueur || !fragile || !piece) {
        res.send("Il manque des arguments");
    }

    let connection = setupConnection();
    connection.query('INSERT into Carton values ( null, null, null, null, "' + origine + '", "' + couleur + '", ' + largeur + ', ' + hauteur + ', ' + longueur + ', ' + fragile + ', ' + piece + ', null)', function (error, results, fields) {
        if (error) throw error;
        res.send("Ajout effectué");
    })
    connection.end();
})

app.put('/UpdateCarton/:id', async (req, res) => {
    const id = req.params.id;
    console.log("matttou : " + req.body.piece);
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query('UPDATE Carton set Carton_origine = "'+ req.body.origine +'", Carton_couleur = "'+ req.body.couleur +'", Carton_largeur = "'+ req.body.largeur +'", Carton_longueur = "'+ req.body.longueur +'", Carton_hauteur = "'+ req.body.hauteur +'", Piece_id = "' + req.body.piece + '", Carton_fragile = "' + req.body.fragile + '" where Carton_id = ' + id, function (error, results, fields) {
            if (error) throw error;
            res.send("Modification effecté");
            
        })
        connection.end();
    })
})

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

app.get('/typePiece', (req, res) => {
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

app.get('/camion/:vol', (req, res) => {
    const vol = req.params.vol;
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        connection.query(`select * from Camion where Camion.Camion_volume > ${vol} order by Camion_volume asc limit 1`, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            
        })
        connection.end();
    })
})





app.listen(16500, () => {
    console.log('Serveur à l écoute')
})

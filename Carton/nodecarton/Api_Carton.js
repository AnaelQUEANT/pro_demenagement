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

function setupConnection(){
    let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
    return connection;
}

app.get('/lesPieces/:idSalle', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    connection.connect((err) => {
        if(err) throw err;

        let requete = 'SELECT Piece.Piece_nom, Piece.Piece_id, COUNT(Carton.Carton_id) as nbCarton ';

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

app.get('/lesCartons/:idSalle', (req, res) => {
    const id = req.params.idSalle;
        let connection = setupConnection();
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

app.get('/lesObjets/', (req, res) => {
    const id = req.params.idSalle;
    let connection = setupConnection();
    connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT * from Equipement_Carton ';
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/infoCarton/:id', (req, res) => {
    const id = req.params.id;
    let connection = setupConnection();
    connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'where Carton.Carton_id = ' + id;
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/getIDCarton/', (req, res) => {
    let connection = setupConnection();
    connection.connect((err) => {
        if(err) throw err;
        let requete = 'select Carton_id from Carton order by Carton_id desc LIMIT 1';
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.get('/objetCarton/:id', (req, res) => {
    const id = req.params.id;
    let connection = setupConnection();
    connection.connect((err) => {
        if(err) throw err;
        let requete = 'SELECT * from Carton ';
        requete += 'left join Piece using(Piece_id) ';
        requete += 'left join Carton_has_Equipement using(Carton_id) ';
        requete += 'left join Equipement_Carton using(Equipement_Carton_id) ';
        requete += 'where Carton.Carton_id = ' + id;
        connection.query(requete, function (error, results, fields){
            if(error) throw error;
            res.send(results);
        })
        connection.end();
    })
})

app.post('/ajoutEquipementCarton', async (req, res) =>{

    const idObjet = req.body.idObjet;
    

    if (!idObjet) {
        res.send("Il manque des arguments");
    }

    
    let connection = setupConnection();
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connecté !");
        let idCarton;
    console.log("prout");
    fetch('http://localhost:16500/getIDCarton/')
    .then(response => response.json())
    .then(response => {
        console.log("MAIIIIIIIIIIS : " + response[0].Carton_id);
         
    connection.query('INSERT into Carton_has_Equipement values ('+ response.id + ', ' + idObjet + ')', function (error, results, fields) {
                    if (error) throw error;
                    res.send("Ajout effecté");
                })
    })
        
        connection.end();
    })
    
    
    
    
   
    

})





app.post('/ajoutCarton', async (req, res) =>{
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
    connection.query('INSERT into Carton values ( null, null, null, null, "'+ origine +'", "'+ couleur +'", '+ largeur +', '+ hauteur +', ' + longueur + ', ' + fragile + ', ' + piece + ', null)', function (error, results, fields) {
            if (error) throw error;
            res.send("Ajout effecté");
    })
    connection.end();
})


app.listen(16500, () => {
    console.log('Serveur à l écoute')
})

/*
* Copyright 2021
* Rémi RAGOT & Anaël QUEANT
* 
MMWNNWMMMMMMMMMMMMMMMMMMMWWWWWWNWMMMMMMMMMMMMMWNWWWWWNXWWWWWWWWWWWWWWMWWWWMMMMMMMMMMMMMMMWNWWWWWK0KXWWMNXXNNWMMWWWNNMMMMMMMMM
MMWXKXWMMMMMMMMMMMMMMMMMMWWWWWWNWMWMMMMMMMMMMMWWMWNWWWWMMWWNNNNNNNNNNNNNNXXWWWWMMMMMMMMMMWNWNNWWK0XNWWWNXXNNWMWWWWNWMMMMMMMMM
MMWXXNWWMMMMMMMMMMMMMMMMMWWWWMMMWMWWMMMMMWWWMMWNNNNNNNWMWWNXXXXXXNXKXKKXK00K00XWWWWWMMWWWNXNNXK000NWWWWNXNNWWMWWWWNWMMMMMWWMM
XXXXXXNNNXXXXNWMMMMMWWWMMWWWWMMWWWWWXXNNNXXNKO00O0KO0XXXKKOkk0KXXOdddoox0XKdlkKX0kOKNWNKOkOkkkxxk0XNNNNXKNNXXKKXK0XNNNXXXNXXN
dodkkxkkxxxxxk0KXX0K0k00OOOO0K0kOOOkoxxodxddolododxk00xdxkxld0KKOdclollx0KkllOKKkllOKOOOxddoooodxxxxxxxxk0OkxxxOkk00OOOkO0kdx
ddddddxxddxdddddxxdxdddooodddxdddddddddoddoooooooooddddooddoodddoollllloooollooolcclollllc::::::::::::::ccc:c:clccllllllccccl
OOOOOO000O0000000000000000000K00000000000000000000KK000KKKK00000OOOOkkkkOOOOO0OOOOOOOOOOOkkkkkkxxxxxxxxxxxxxxddddddddooooooll
OOOOOOOOOOOOOO00OOO0OO00OOO0OOO0O00000O00000OO000000OOOOkkkxxxxxdddddddddxxkkkkOOOO000000000000OOOOOO000000000KKKKKKKKKKKKK00
OOOOOOOOOOOOOOOOOO00OOOOOOOOOOOOOOOOOOOOOOOOOOOOkxddolcc:::::::::::::::::cccclllooddxkOO0000OOOOOOOOOOOO0OOO00000000000OOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkxol:;,,,,'''''''''''',,,,,,,,;;;;;::ccclloodxkO00OOOOOOOOOOOOOO00000000O00OOOOOO
OOOOkkOOOOOOOOOOOOOOkkkkOOOOOkkkkOOOOOOkkkkxc,..........................''''',,;;:cloddddoodxO0OOOOOOOOOOOOOOOOOO00OO00OO0OOO
kkkkkkkkkkkkkkkkkkkkkkkkOkkkkkkkkkkkkkkkkkxl;'.............................'',;;coOKXXKOxdlooxOOOOOOOOOOOOOOOOOO0OOO000O00000
kkkkkxxxkkkkkkkkkkkkkkkkkkkkkkkOkkkkkkOOOxoc:,'............................''',;;cloodollllloddxxkOkOOOOOOOOOOOOOOOOOOOOOOOO0
kkkkkkkkkkkkkxkkkkkkkkkkkkkkkkkkOkkkkkkkOklcl:,'''.............................',;;;;;:::c::c::lxkkkkkkkOOOOOOOOOOOOOkkkkkkkO
kkkkxxxkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxkkkkkdccc:;,,''...................................''''...,okOOOOOkkOOOOOOkOOOOOOOkkkOOkk
kkkxxxkkxkxkkkkkkkkkkkxkkkkkkxxxkkkkkkkkkkkoclc:;,'''''.........................       ......'lxkkkkOOOOOOOOkkOOOOOOkkkkkkkkk
kkxxxxxxxxkkkkxxxxxkkkkkkxkkxkxxxxxxxxkkkkkklccc;,.............................        .....'cxkkkkkkOOkkkOOOOOOOOOOOkOOkkkkk
kxxxxxxxxxxxxxxxxxxxxkkxxxxxxxxxxxxxxxxxkkkkxl:cc;'...........................        ......cxxxxxkkxxkkkkkkkkkkxkkkkOOOOOOkk
xxxxxxxxxxxxxxxxdddxxxxxxxxxxxdxxxxxkkkkkxxxxdccc:,...........................       ......cxkkkxxxxxxxxxkkxxxxkkkkkxxxkkkkkk
ooooddooddxxxxxxddxxxxxxxxxxxxxxxxxxkxkxxxxxxkdccc;'..........................       .....;dxxkkkkkkkkkxxxdxxxxxxkkkxxxxxxxxk
:ccloooddoooddddxxxxxxxxxdddxxxxxdddxxxxxxxxxxdl:cc,..........................      .....,oxkkxkkkkkkkkkkkxxxkxxxddxxxkkkxkkk
...',;:clloooooooddddoddddddxddoddddddxxdddxxxxdccc;'........................       ....'coddddxddxkkkkkkkkkkxxxxxdddddxxxxxx
........'',;:cllooooooooooooooddddddddddddxxddxdlcc:,'.......................     ......;oddooooooooddxxkkkkxxxxkkxxxdddddddd
.''...........'',;:ccloooooooooooooooodoooodddddoccc;,'''....................     .....,coooooodddoddddddxkxxxxxxxxxxkxddddod
''...................',;:clllloooooooolllloooodddc:c:,,'''...................     .....:dxdddddddoollooooddddxxxxdddddddxxxdx
c;,,'.....................',,;::cllloooooooooooool:c:;,,''...................    .....,lxxdooddddddooooolllllllodddxxxdddddxx
c::clc:,'........................,;;:cllloooooooolccc;,,'''..................    .....,codddddddddoooddoooooooooooooddddddddd
,,;::lllllc:,'........................'',;:clddxkxolc;,,''...................   ......;lllloddddddddxdddddddooooooooooooooddd
...'',;:clccllc;,'.........................'ckKXNN0o:,'''..................... ......':ooollllooooooooodxxxxxdoooollllloooooo
'''....',;:::cccc::;,'......................'oKWWNk:'...............................',coooooooollooolllloodxxddddoollllllllll
:,'''''''''',;;:::cccc:;,'...................'okdc;'...............................'',:lllllooollloollllloodddddddoolllllllll
KOdc;,,,''''''''',;::ccc::;;;,'...............''..'.................................',:lcllllolllllllllllooooddoddddoolollllc
WWWX0koc;,,,,''''''',,;;:::::::::;;,'..........':oc,,...............................',clllllllllooooooooollooooddddddddoooooo
WWWWWWWX0ko:,,,'''''''''',,;;:cccccccc:,,'......lOxlc;'''''.........................',clllllllccclccllllllloolllloooodddddddd
WWWWWWWWWWNKko:,'''''''.....'',;;;;:cllllcc;,'..,lll:,,'''.........................'',clcccccccclllccccclcclllccllllllllooddd
WWWWWWWWWWWWWNKkl:,,,'''''.''...'',;;:cccccccc:;:llc:'''''.........................'';looollooolllllllclllcccllllcccclllllloo
WWWWWWWWWWWNNNNNNKko:,'''''.'''''...',,;;::clllcllcc;'.'''..........................';loooooooolllllllllccc:::cccccccccccccll
WWWWWWWWWWWWWWWWWWWNKkdolc;,'''''....''',,;,,;;::;;,....''..........................,cododxkxxddooollllllllcccc:::::::::::::c
KOXWNNWWWWWWNNWNNNNNWWNNXK0Oxdl:;',,,,;;;;;;;;;;;;,......................'.........'cxkxxxxkkkkkkkxdddoooolllllllllcccccc:::c
XxoKWWWNNNWNNNNNNWNNNWNNNKOdoc,'....'.';;,,,,,,,,,,'.....................',....'',;:dOOxdodddddxxxxxdoooodoolooollllllccccccc
WNxxXWWWWWWWNNNWWWWWWWWNOc,'...........'...............................',:;,,,;;;ccldxdoolllooooool;'.',:cooloddollloolllllcc
WWNNNWWWWWWWWNWWWWWWNXKOl'.........................................'''',,,;:clloxkxollllclllllllllc;,,,,;:locloolcccloollllll
KNWWWWWWWNWWNNNNXK0kxdlc,.....................'''..  .............'''',,,,;:cdkkkxc:;,,,;;:cccclllllcc::::clcllooccccccllllcc
clddxkO0KXX0kxxdollllll:'..........'''''''....''';,...'.'''''''''..'''',,;;;:cooc:;'',;;:;'',:cclccclcccllllooookOkxdlccllllc
;;;:;;;:clllllllllllllcc;.........'',,;;;;;,'...,ll;',,'''','''',,,,,,,,;;;:cdkdc:;'''';ccc:,,ccccccclllllollllxXMMWNXKOkxolc
;;;;;,;;,,;cooollllccccllc:,..........'',,;,,,,;;:;;;,,,',,,',,,,,,,,,,;;:cokK0dc:::;,,;cllllc:cccoolccccclodkOXWMMMMMMMWWNXK
,,,,,,,;,,,coddooollllllloolc:;'.....'''''',,,;;;;;;;;,,,,,,,,,,''',,,,;;:lkXKklc::::::::ccccccc::::;:clodkKNWMMMMMMMMMMWWMMM
,,,;,,,,,'':odddxddodxkkxooolllc:,'...'',;,'''',,;;;;;,,,,,,,,,'''''',,',cdO0koc:::::::::cllc:;;,;;:ldk0XNWMMMMMWWWMMMMMMMMMM
,,,,,,,,,,';coddxxxxkOKXK0Oxolllccc;'....',;;,'''',,,,,,,,,''......';cl:';x0Odlc::::ccllcc:;,,;:loxOKNWMMMMMMMMMNK00KXNWWMMNK
;;,,,,,,,'',,;codxxxkkO00KKK0kdolllcc:,'....',;;,'''',,,,,''.......';oddc:xOdllccllllc:;;;::clxOKNWMMMMMMMMMMMMMNkooodxkkkxoc
;;;;;;;;;;,,,,,,coxxxkkOOO00KKK0xollcccc:;'.....',;,,''''''''','..',cdxxxxxoloddoc:;,,;:coxOKXWMMMMMMMMMMMMMWWMNx:;;:cllc;;;;
;;:;;;::::;;;,,,,;codxkkOkOO000000Oxolllccc::,'....,;;,,'..''''''',,;;;cdOOxdol:;,;:cldk0NWMMMMMMMMMMMMMMMWWWWWk;',,;;::::::;
kOOOO0OO0Odc;;,,;,,;cloxkkkkkOO000KXK0kollllcc:;,.....',,,'.....'''',,;;codoc:cccldk0XNWMMMMMMMMMMMMWMMWWWWWWNO;...',;;;:::;;
WWWWWWNNNNN0dc;;;,,,;;;codxkkkkOOO000KX0Oxolcllcc:;,'....',,''''''''',,;;:cllldxOKNMMMMMMMMMMMMMMMWWNWWWWWWNKx:'''...',,,;;;;
WNNWNXNNNNNNX0xc;;;,,;;,;cldxxkkkkOOOO000K0kdlllcccc::;'..';,,,,,;;;;;::ccldk0XWMMMMMMMMMMMMMMMMWWWWWWWWN0koc,,;,,,''.'''',,,
NNNNNNNNWNNNXXX0xl:;;;;;,,;:codxxkkkkO00OO0000Oxdollcccc:;;:::;;::cclodxkOKNWMMMMMMMMMMMMMMWWMMMMMWWNX0xl:;;:;,,;;;,,,''....'
WNNNNXXNNNNXXXXXXKkl:;;;;;;,;:coddxxkOOkkOO000KKXXKKK0000000000000KXXNWWMMMMMMMMMMMMMMMMMMWWWMMWWWWKxlc:::cccccc:;;;;;,,,''''
NWNNNNNXNNNNNNXXXNNXko:;;;;;;;;:cloddkkkkxxk00OOO0KWMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWMMMMMWWWWWOlllollllllcc::;;;;;;;,,,'
NNNNWNNXXNWNNWWNNNNNNXOoc:;;;;;;;;;clodxxkxxxkkOkddkKNWWMMWMMMMMMMMMMMMMMMMMMMMMMWWWWWWMMMMMMWWNNWWWNKOxdoooolcccc::;;;;;;;;;
NNNNNNWWNNNWNNNWNNNNNNNX0dc::;;,;;,,;;coodxkkxxxxxOOOO0KXWWWMMMMMMMMMMMMMMMMMWWWWWWWMMMMMWWWWWWWNWWWMMWNX0xdollllcccc::;;;;;;
NNNNNNNNNNXNNNNNXNNNXNXNNNKko:;;;;,,,,,;:cldxxxxxxkO0K0OkO0KXWMMMMMMMMMMMMWWWWWWWWMMMMMWWNNNWMMMMMMMMMMWWMWX0kxdoolccc::::;;;
NXXNNNNNNXKXNWNNXXXNNNNWNNNNXOdc:;;;,,,,,,;:lodxxxddxk0K0kxddKWWWMWWWMMWWWWWWMMMWMMMMMWWWWWWMMMMMMMMMMMMMWWMMMNX0kdlccccc::;;
NNNNNNNNNX00NNNNNXXNWWWWWNNNNXX0o:;;;;,,;,,,;cllodxxdodO0OxloOXNWWMMWMMMMMMMMWWWWMWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOdlccc::::
*/
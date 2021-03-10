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

app.listen(16500, () => {
    console.log('Serveur à l écoute')
})

/*
* Copyright 2021
* Rémi RAGOT & Anaël QUEANT
* 
MMMMWNNWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMWWWWWWNNWMMWMMMMMMMMMMMMMMMMMMWNNWWMWNWWWNKKNWMWNWWWMMMWMWMMWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMNKNWWNWMWWN0OKKXNWWMWWNXNXXWXXWMMMWWNWWNXWMMMMMMMMWWMMMMM
MMMMNXKKKXWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMWNWWWWMWWWNXWMMWMMMMMMMMMMMMMMMMMMWNWMWWNNWWWWNWMMMWNNNNNNNXXNNNXXNNNNWWNNNNWNNWWMMMMMMMMMMMMMMMMMMMMMMNXWMMNXWWWNOO0XNWNWWWMNNXKNNXNMMMMWWWWMNNWMMMMMMMMMMMMMMM
MMMMNXK0XNWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMWWWMMWMWNWMMWWMMMMMMMMMMMWWWMMMWWWWWNXNWWMWWMMMMMWWNNNNXXXXXXXXXNNXNNNNWNKkkKNNNNNWWMMMMMMMMMMMMMMMMNXWWWNXWMMXO0KNWWWWNWWNWXKNNNWMMMWWWWWWNNMMMMMMMMMMWMMMMM
MMMMWWXKNWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMWWMMMMWWMMMWMMMMMMMMMMWWWWWWMMWNWXXXNNWWNNNMMMMWWWNNNNXNNXXNNNXXNXKKXNNXK00XXK0O0XNWWWMMMMMMMMWWNWMXXWMWWWKO0OOKNNWMMWWMNKXXXWNNWMMMMMNNWWXNMMMMMMMMMWWMMMMM
MMMWMWNNNWWWWWMMMMMMMMMMMWMMMWMMMMMMMMMMWWMMWWMMMMWWMMWWMMMWMMMMMMWNWWWWNXXXK0XXXX0x0XNNNWWNX0xkKkkKNNXXKOxxxdoodxxOKXNKkoldOXXXK00K0XWMMWNKKXOkKKOkkOxddxO0XNWMMMMMNXNXXWNNWWWWWWNNXKKNMWWMMWWMWWWWWWMM
K0O0KXKXK0XXKKK000KK00XWMMMMMWWMMNXNWMWWWNWWWWMMMWNNWWWWWNOkKXKK0K0OKXKOdddkkkOkkKkkXNXK0OOOK0kkxdOXNXX0dlccllllcokKXNKxlclkKXXK0dood0NNNNWXOdlokxdodxxxxk00OKXKKKKK000KNN0KKkkkkO0KOxKNNKKKK00OOXN0O0KX
olllokxxxokkxxdddxkxdx0XKKNWNOkKXOxkKKOOOOOkOKXNKOkk00000kloOxdocdkxoddoolodxdddxkxONN0kxxxxOOlclkXXNXXOolllloolcoOXXKKdccoOXNXKklcco0NKkkOOkkkxddddooodddxxxxxxddxddxkO0OkkxxkxkkOOkkOK0OO0OOOOOKXOddod
ddoloxxddodxdolodddoooddoodxxocdxocooc:ccccclooollcclllcll:cocclclol:::::ccc:::::clloolc:cccclc::lodddolc:::::::cloddddl::coddddlcccldxdolloddolccccc:ccclllllllllolloodddooodoodkxxddxxkkkkOkkxxxxxdodx
oddddoooooddddoooodddddddddddddddddddddddddddxxxxxxxxxxxxdddddddddddddddddddddooddddddddddddddoooooooooolllllllllllllllcccccccccccccc::::::::::;;;;;;;,;;;;;;,,,,,,,,,,,,,,,,,,,,;;;;;;;:::::::::;:cc:cc
0000000O000000000000000000000KK000KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK000000OO00OO00000000000000000000000OOOOOOOOOkkkkkxxxxxxxxxxddddddxxxdddooooooollllllllccccccc:::::
OOOOOOOOOOO0000000O000000000000000000000000000000000000000000000000000000000000000000000000000000000OOOOkkkkkkkkkkkkOO0000KK00000000000000000000000000000OOO00000000000000KKKKKKKKKKKKXXXKKKKKKKKKKK0000
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00OO0OOO00OOOOOOO0000OO0000000000000000OO0000OOO0000000OOOkkkkxxxxxdddddddddddddddxxxxxxkkkkkkOOOO000000000O00000000OO0OOOOOOO0OOO000O0000000000000000000000000000000O00
OO00OOOOOOO00OOOOOOOO0OO00OOOO0000OOOOOOOOO0OOOOOO0OOOO00OOOOOO0000OOO0OOOOOO00OOOkxddoolllcccccccc:::::::::cccccccccccllllllooodddxxkkOO000000000O0OOOOOOOOOOOOOOOOOOOO0OOO000000000000000000000OOOOOOO
OOOO0OOOOOOO00O00OOOO0OOOOOOOO00OOOOOO0OOOO0OOOOOOOOOOOOOOOOOOO00OOOOOOOOOOOOkdollc::::;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::::cccccllllooddxxkO000K0OOOOOOOOOOOOOOOOOO00OOOOOOO0000000OO0000000OOOOOOOOOOO
OOOOOOOOOOOOOOOO0OOOOOOOOOOOOOOOOOOOOOOOOOOOOkOOOOOOOOOOOOOOOOOOOOOOOOOOOxdol:;;;,,,,,''''''''''''''''''''',,,,,,,,,,,,;;;;;;::::::cccllloooddxkkO0000OOOOOOOOOOOO000OOOOOOO0000000000000OOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkOOOOOOOOOOOkOOOOOOOOOOOOOkkkkkkOkdc;,,'''.............................''''''''''',,,,,,,;;;;:::cccllllooooodxk000OOOOOOOOOOOOOOOOOOOOO000000000000OO000000000OOOOO
OOkkOOkkkkOOOOOOOkkOkkkOOOOOkOOkkkOkkkOOOOOOOOOOkkkkOOOOOOOOOOkkOkkkkko;'............................................'''''',,,,;;;:loodxxdddkxdoooodxO00kkOOOOOOOOOOOOOOOOOOOOOOOOO0OOOOOOOOOOOOOOOOOOOO
kkkkkkkOkkOOOkkkkkkkkkkkkkkOkkkkkkkkkkOOkkkkkkkkkkkkkOOOOkkkkOOkkkkkkdc;'..............................................'''',,;;:lodOXNWWWNNKOkxooloodxO00OOOOOOOOOOOOOOOOO0OOO000OOOOOOOO00000OO00000000
kkkkkkkkkkkkkkOOkkkkkkkkkkkkkxkkkkkkkkOOOkkkkkkkkkkkkkkkOkkkkkOOOkkxdoc;,'..............................................''',;;;:cloO00KKKK0kdoolllloddkOOkkkkkOOOO0OOOOOO0OOOOOOOOO00OOOO000000000000000
kkkkkxxxxxxxxkkkkkkkkkkkkkkkxxxxkkxkkkkkkxxkkkkOkkOOkkxkkkkkkOOkkkkdllcc:,'''...........................................'''',,,;;;:ccclllllccccllllodddodxkkkOkkOOOOOOOOOOOOOOOOkkkkOkkOkkOOOOOOOOO000OO
kkkkkxxkkxxxxxxkkkkkkkxxkkkkkxxxxkkOkxkOOkkOOkkkkkkOkkkkxkkkkkkkkOkdcclc:;,,''''........................................''....',;;;;::::::::ccccllllllccldkkkkkkkkOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkO
kkkkkkkkkkkkkOOOOOOkkxxkkkkOOkkxxkkkkkkOOkkkkkkkkkkkkOOkkkkxkkOkkkOxl:llc:;,,,''''..............................................',;;;;;;;;;;::::;;;;;,;;cxOOOkkkkkkkkkkkkkOOOOOOOOOOOOOOO0OOOOkkkOOOkkkk
OkkkkkxxxxxxxkkkkkOOkkkkkkkkkxkkkxkkkkkkOOOkkkkkOOkkkkkxxxkxxxkkkkkkd::llc:;;,,,'''........................................................'''''....'.';okOOOOOOOOOOOOOOOOOOOOkkkOOOOOOOOOOOOkkkkkOkkOOO
xxkkkkxxxxxxxxxxxxxxkkkkkxxkkxxkkkkkxkkxkkkxkkkkkkkkkkkkkxxxxkkkkkkkko:cllc::;,,,,''''''.........................................       ..............,lkkkkOOkOOOOkkOOOOOOOOkkkkOOOOkkxkkkkkkkkkkkkkkkk
kkxxkkxxxxkkkkkkkkxxkkkkkkkkkkkkkkxxkkkkkxkkxxxxxxxkkkkkkkkkkOkkxkxxOkl:cllc:;;,''''''''.......................................            ..........'cxkkxkkkkkkOOOOOOOOOOOkkkOOO0OOOOOOOOkOOOkkxxkkkkk
kkkkkkkkxxkxxxxdxxkkxxxxxxkxxkkkOkkkkkkkxxxkkxxxkxxxxxxxxxxxkkkkkkkxkkxl:clc::;,'....''.......................................             .........'cxkkkOOkkkkkOOOOkkkO00OOOOOOOOOOOO00OOOOOkOOOkkkkkk
xxxxxxxxxxxkkxxxxxxxkkkkxxkkxxxxxxkkkkkxxxxkkxkkkxxxdxxxxxxxxxkkkkkkkkxdc:ccc:;,'.....''.....................................             .........'cdxkxxkkkkkkkkkkkxxxxxxkkkOOOkkkkkkOOkkkOOOOkkkkOOOO
xxxxxxkxxxkxxxxxkkxxxxdxddxkxxxxxkxxxxkxddxxxxxxxdddxxxxxkkkxxxxxxxkkkkkd:;clc:;,'....''.....................................            .........':dxkkkxxkkkkxxxxkkkkOOOOOkkkkkkxxxxkkOOOOOOOOOOOOOkkk
xkkkkkkxdxxxkkxxxxxkkkxxxkkkxxxxxxxxxxxxxxxxxxxdddddxdddxxxkkkkkkkkxxxxddo::llc;,'.....'.....................................           .........'cxkkkkxdddddxxkkkkxxkkkxxkkxxxkkkkkkkkkkkkkkOOOOOOOkxx
dddddddxxxxdddddxxxxxkxxxddooddxxxxxxdxxxxxxxxxxxxxkkxxxxxxkkkkxxkkxxxxxxxl:cll:;,..........................................            .........;dOkkkkkkkkkxxxxxxxxxxxxxxxxxdxkkkkkkkkxddddxxxxxxxkkkk
ooooooodddooodddxxkxkkkxxddddxxxkkkkxdddxxxxkkxddxxkxxxkkkkxxxxxxxxxxdxkkkxl;clc:;'.........................................           .........;oxxxkxxkkkOOkkxkkxxxxddddddxxxdxxkkxxxkkkxxxxxxxxxxxxxk
loooooooooooodddddddddxxxxxxxxxxkkxxxxxxxxdddxdddkkxxdddxxxxxkkkxxxkkxxxxxxd::llc;,.........................................           ........,lxkxxxxxxxkkkOkkkkkOOkxxxxxxxxxxxxxxxxxxxxxxkkkkxxkkkkkx
,,;:cclooooooddoooooooooooodxxxxxxxxxxddddddxxxxxxxxxxddddddxxxddxxxxxxxddddl;clc:;'........................................          ........'cddxkkxxkkkkkOOOOOkxkkkkkkkxxxxkkxxxxddddxxxxkOOkxxxxkkkk
....'',;::clooooooooooooooooddddddddddddddddxxxxdoodddddddddxxxdddddddxxxxdddc:ll:;,'.......................................          ........;oooddxxxxkxxdxkkOOOOkkkkkkkkkkkkxxxkkxddddddddxxkkxxxxxxx
..........'',;:ccloooooooooooooooooooooodddddddoooooooooooddddddddddxxxdxkkxxo:clc:;,......................................          ........,lddooooooooooooddxkkkkkkkkkkkkkkkxdxkkkxkkxxxddddddddddddx
....',..........',,;::cllooooooooooooooooooooooddxxdxxddddddoooddodxkxxdddxddo::llc;,'..''.................................          ........:oddddddooddoolllllooodxxxkkkkkxxkkkkkkkkxxxxxxdddooooooooo
.,'.,;'...............'',;::clooooooooooooooooooooooooooddddodxxdoooddxxddddddl;clc:;,'''''................................         ........,clloodddooodddddooddddoooodxkxxxxxxxxxkkkkxkkxxxxxddddddddd
.'''.........................',;;:ccllllllooooooooooooooooooooooollllodddddddxd::lc:;,,'''''...............................         .......':odoooooooooddddoooodddddddxxkkxxxxxxxddxdddxxxxkkxddooooodd
,'.................................',;:ccllollllooooooooooolllllcllloooooooooodc;clc;,,'''''...............................        ........;lddddddooodddoooollllolllloddddxxxdxkxddddoooooododxxxxxxxxx
:;,''...................................',,;;:clllolllllloolooooooollooooooooddo;:lc:;,,,''''..............................       ........'cdxxxdddddxxxdddddooolloooooollllllooddxxdxxxxxxddddddddxxkkk
lc:;;;;'......................................'',;::cllllllloooooooolllooooolooo::lc:;,,,,''''.............................       ........,ldxxdooooooddddddddddddoollllllcccccccllooooddxxxxdddddddddxx
ccc::clll:;,'........................................',;:cclllooollooooooooooooo::ll:;;,,'''''.............................      .........;lodxxxxdddddoooodoooooooddoodoollllooooooooooooddddddddxxxxxx
;;::::cllollcc:;,,'.......................................'',;::clllloooooooooodc:llc:;,,'''''.............................      ........';cccllodxxxxxxxxxxxdddoooodoooodooooddddooooooddddooooooodddxd
'',;;:::clllooooolc:;,'.........................................',,;::coddxxxxkkdlllc:;,,,'''..............................     .........':lllllllodddddxxxddxxxxddddddddddddooooooooolllllooooodddddddx
.....''',::cllllollllcc:;,...........................................',lxkOKXXNNXkolc;,,''''...............................   ..........',cooollllllllooooolloooooodxxkkxxxxxxdoooooooooooollllllloodddd
.........',,;:ccccccclllc::;,,'........................................,d0KNMMMMWOol;'...'''...............................   ..........',cooloooooolllllllloollllllllodxxxxkxxddooolllllloooooooooooooo
''''........',;;::::cccccccc::::;,''....................................:xKNMMMWNkc,.......................................    .......''';lddoooodddddoollloooooollllllooddddddddddddolllllllcclllllllll
'''''''''..''.''',,;::cccccccccccc::;,,'................................'ckXWNKOo;'.................................................''''';lllllooooooddoooooooollloooollloddddddddoodddooolllccllllclccl
c;,,,'''''''''''''''',;;;::::ccccccc:c:;;,,'.............................'cdoc;,''''................................................''''';ccllllllllooollllllooollllllllllooddddxxddooooolooolllllllllll
N0ko:;,,,,,,''''''''''''''',;;::ccccccc:;;;;:;;,'.........................,'..''''.................................................''...':ccccclllllloolllllccllllllllllooooddooooddddddoooooooooolllccc
WWWNKOxoc;,,,,,'''''''''''..'',,;;::::::::;::::::;;,'.....................'''.''......................................................'',:lllllllooollllloooooollllloooolloolooddooooddddddollllllllllll
WWWWWWNNKOdl:,,,,,,,''''.'''''.''',;;;;:::::cccccc:::::;;,'.................';lxo:;;,'.  .............................................'',:loolllcclllllloooooooooooooooooooddooddddddddddddddddddooolloo
WWWWWWWWWWWNKkdl:;;,,'','''''''''''.''',,,;;:::cclllllllcllc:,'.............'ckKOoll:;,...''''........................................'',:ooooollolllccccccllllllodooooollllllllllloodddddxxxxxxdddooooo
WWWWWWWWWMWWWWNX0kl;;,,,,','''''''''''...','',;::cc::::::cclolc:::;,'........,oxdlll:;;,,,'''''.......................................'',:cclccclllolllllcccccccccccccclooooooollcccclccllloollooooodxdd
WWMWWWWWWWWWWWWWWWX0kl:,,,,,''''''''..........'',;;;;;;;;;:cllllllllc:;,'.....:xdcll:;,,,'''''........................................'',:cccccccccccccclllllcccc:::cccllcclloolclllooollllllllllooddddd
WWWWWWWWWWWWWWWWWWWWWN0xo:,,,,,'''''''..'''........',,;:::::cccccccccccc:;;,'',ll:ll:,''''''''......................................'''',coooolllllllllcccllllloollclllccccccclllccclllllllllooooooooddd
WWWWWWWWWWWWWWWWWWWWWNNNX0xl:;,,,''''''''''.''''.....'',,,;::ccccccccccclllcc:cddcll;'..''''''......................................'''',coloooooloodddoolllllllllccclllllllllloooolccccccccccccllcclloo
WWWWWWWWWWWWWWWWWWWNNNNNNNNNKkl:;,,,''','''''''...'........',,:::;::cllloolllloxdccl;'...'''''.......................................'.':ooooooooolllloollllllllcclllcccc:::::::cccllcccccllcccclllolcll
WWWWWWWWWWWWWWNWWWNXNWNNNWWWWWX0xl:,,,,,,'''....''''.........'',,,;;;::c::::c::;,,:;'....'''''.......................''..............''':lddoooddddoollllcccllllllllllllllccccccc::::::::::::::::::ccclo
WWWWWWWWWWWWWWWWWWWWWWWWWWWNNNNWNK0kxdoc::,,'......''.........''',,,,,,'',,,;;:c:,,.......''.........................''..............',:codoloookOkxxxddddoollllllccllllllllcccccccc::::::::::::::::::cc
WNXXWWNXXWWWWWWWWWWWWWWWNNWNWWNWWNNWWNNNXKOxdoloc;c:'''''',,,;;;;;;;;;;;;;:;::::;,'.......''.........................''..............',:okkxxxkkkkkkkkkkkkkxxdddooolllllllllllccccclllccc:::::::::::::::
XOloKWNXNWWWWWWWWWWNXNNNNNNNWNNNNWWNNNNNNNXXXK00kdoc,,,,;;;;,;:::::;;;;;:;;;;;,'','.................................'''............'',:ok0Oxdxxxxxxkkxkkkkkkkkkxxxxdoooooollllloolllllllllllllcccccccccc
WNO:lKWWWMWNNNNWNNWNNNWNNNWWWNNNNWWWWWNNNX0Oxol:,'........,,..,;;,,,,,,,,,,,,,;,,,'....''............................'''........',;;:cokOOOOxdoddddddxxxxxxxkkkkxdooolooooooooooolllcccccllccccccccccccc
WWNk:lKWWWWWNNNNNWWWNNNNNWWWWWWWWWWWWWWXOoc;,'.......... .....'''''''''''.'''''',,,'..'''..'......................',;cc;,'.',;;;;:ccc:okOkxxdollllooooooddddxdoc;'';:clodddooooooddoolclllllcccccccccccc
WWWXxckXWWWWWWWWWWWWNNNWWWWWWWWWWWWWNWNx;,,''........... .............................................''..'''','',;;::::;;;;::;,;:cloooxxdoolllllllllllllllooc,.......',:codloooooodooooooddolloooollccc
NWWWNNNWWWWWWWWWWWWWWWNWWWWWWWWWWNNNNNKl'..................................................................''....''',,,;;:::cc;:oxxxkdllllllcclllllllllllllllc;'.',;;;::codoc:codoolc:ccclooddoolllllllo
NWWWWWWWWWWWWWWWWWWWNWWWWWWWWWWNNK0kxddc''......................................    .....................'',,'',,;;,',:cclodkkO0XXOxolcccccccccccccllllllllllllc:;;;;;;;;colllclllodl:cc:cccllllllllcccc
NNNWWWMMWWWWWWWNNWWWWWWWNNNX0Okxdlllllc'.................................',,,,,..    .............'''..........'',,,,',;;:cdkkkOkdol::;'.'''',;:ccccccllllclllllcccccllcccllccclllodoccccccccllllllllccc
lldxkO0KXNWWWWWWNWWXK00kxxdolllllllllc:'................................'',,,,;;,..  .'...'................''''''',;;,,;::::clllcc:,'''',,,;;,,..';:ccccllccccclllllccccccccloddooooddllcccccclloollllll
;;:::::ccloxkk0KX0xollolllllllllllllcc;...............'',,,,,,,;,,;;,.........,::;'..',''''''''''''''''''''',,,,,,,,,,,;;;:coxxocc:;,',;;;:cclo:'...,ccccccccccccccccccllodooooolld0NWNK0Oxdlcccclcccccc
;;;;::;;;;;;;;:cccccllllllllllllllllllc,...............''',,;;;;;,;;;,'......'codo:,,,,,,'''''''''''',,,,,,,,,,,,,,;;;;;::coxkxlc::;,....',,:ccclc;'',cccccccccccccclodolollcclllokXWMMMMMWWNKOkxoolcccc
,;;;;;;;;;;;;;;,,:llllolllllllllllcccclcc;,'..............'''',,;;,,;;,,',,,,;clc:;;;,,,,''','',,,,,,,,,,,,,,,;;;;;;;::ccldOKOxlc:::::,'.'',,:llllll:;:cccccccclllooollccclllllodxKWMMMMMMMMMMMMWNXK0Oxd
;;;;;;,,,,,,,;,,,;looloollllllccccccccllooll:,'...............''',,,,;;;;;;;;;;;;;;;;,,,,,,,,,,,,,,,,,,,,,,,,,,,;;;;;:cldOKXK0dlc:::::;;;;;;:coolccccccc:cccldxdlc:::ccclllloxk0XNWMMMMMMMMMMMMMMMMMMMWW
,,,,,,'',,,,;;,,,;coooddooooolllllcllllooolllcc:;'......''.'......''',,,,;;;;;;;;;;;;;,,,,,,,,,,,,,,,,,,,,,,,,;,,,;;;::oOXNNKkocc:::::::::::::cc::cc::ccccclll:;;;::ccllodxOKNWWMMMMMMMMMMMMMMMWWMMMMMMM
,,,,,,,,,,,,,,''',:oddxddddoolooooollooloooolllllc:,'......'',,,,,'''''',,,,,,;;;;;;;;,,,,,,,,,,,,,'''''''''',,,,;;;:cldOKXKOdlc:::::::::::::::::::clllc:;;,'',;::clldxk0XWWMMMMMMMMMMMMMMMMMMMMWMMMMMMM
;,,;;,,;,,,,,,'''';looddddxxxdooodxxO0Odoloolllllcccc:,'......',,;;;,,''.'',,,,;;;;;;;,,,,,,,,,,,,,,''..'''''''''.',;cok000kdolc:::::::::::::::cloooc;;,'',,;:cccldOKXNWMMMMMMMMMMMMWWMMMMMMMMMMMMMMMMMM
;,,,,,,,,,,,,,,,'';cloodxxxxxxxxxk000KXX0Oxollllllcccccc;'.......',;;;;;,''.''',,,;;;;;;,,,,,,,,,,,...'.''''',clc;'.':dO00Oxdlcc:::::::::::cloolc:;,'',,;:cclldxOKNMMMMMMMMMMMMMMMMWX0KXXNWMMMMMMMMMWWMW
,,,,,',,,,,,,,,,'',,:loodxxxkxxxkkO0000KXXX0kdlllllllcclc:;;,.......',;;;;,,''..'',,,,,;,,,,'','............';oolol;.'o0KOkdllcc::::::cclodolc;,,,,;;:cccloxOKXWWMMMMMMMMMMMMMMMMMMWN0kxkkkO0KXNWWMWNXOx
;;,,,,,,,;,,,,,'''''',:coddxxxxxkkkOO00K0KKXXX0kdolllllllcc::;,........',;;;;,,''..'',,,,,,,'','..........''';lddool:;lO0xolccc::::cloxxlc;,,,;;;;:cclodk0XNWMMMMMMMMMMMMMMMMMMMMMMWXkoodddddddxkkOkdlc:
;;;;;;,,;;;;,,,,,,,,,,'',:lodxxxkkkkkkO000000KXXK0kolllllllc::c:;,........'',;;;,,''..'''',,'''''.''.......',cxOOOkoldkkxolccllodddlcc:;,,,,;::ccloxkOKNWMMMMMMMMMMMMMMMMMMMMMMMMMWKd:;;:cclooool:;;;;;;
;;;;;;;;;;;;;;;;;;,,,,,,',;coddxxxkkOOOOkOO00K00KXXKkdolllllcccccc:;,'........',,;:;,,'...'''''''',,,,'''''',lddxxddk0Odlccldxkxoc;,',,;;:::cloxOKXNWMMMMMMMMMMMMMMMMMMMMMMMWWWWMMNd;;;,;:::::cc:;;;;;;;
;;::::;;;;;;::::;;;,;;,,,,,,:loddxxxkkOOOOkkO0000000KK0kdolllllccccc:::;,'.......,;;;;;,''....''','''',,',,,,;;;;:lxkkxodxxxdl:;,,,,;;:cclodk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWMNx;',,,,;:::::::::::::;
;;::cccccccllllc::;;,,,,,,,,;;:clodxxkkkOkkkkOOO0K00OOKXXKOxolllllcccccc::;,'.......',;;;;,''....'..''''',,'',,;;::ldkOOkdc:;;;::::cclodxOKNWMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWNk;'..'',;;;;::::cc:::;;
O00KKKXXXXXXKXXX0d:;;;,,,,;,,,,;:ccldxxkkkkkkkkkkOKK0O00KXNNKkdoollllcccccc::;,'.......'',;;,'''.......'''''',,,;;;:clcc:::cccccllldxOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWNWNk:'....''',,;;;;;::;;;;;
WWNNWWWNWNNNNNNNWXOdl:;;;;;,,,,;;;;;;lodxxxxkkkkkkkOOO00OO0KXNX0xolllllllllccc::;,'.......',,,,''''...''''''''',,,;;:::cccclllloxk0XWMMMMMMMMMMMMMMMMMMMMMMMMMWNNWWWWWWWWWWWWNNk:''......'',,,;,,;;;;;;:
WNWNNWWWNNNNNNNNNXXKOxc;;;;;;;,,,,,;;,;codxxxxkkkkkkkkO000O000KXXKOxolcllllccccccc::,'......',,,'''''''''''''',,;;::::cllllodxOXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNNWWWWWWNNNWNKko:,,''''''....''',,,;,;;;;
WWNNNWWNNXXNXXNNNNNNXX0dc:;;;;;;,,,,,;;;:coddxxkkkkOkkkkOOOOO0OOO0KXKOdlllllllccccccc::;,'...',;;,,,,,,,,;;;;;;;::::ccllodkKXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWNNX0ko:;;,;;,,,,,,'..''.''',''',,,
NXXNWWNXXNNNNNNNNNNNXXXX0xc:::;;;;;;;;;;,;;cloddxxkkkkkOkkkkOKK0OOOO0KK0Oxolllllccccccccc:;,'',;;;;;;;;;;;::::::clcclodOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWWXOdl:,;;:;,',,;,,,,,,,,''...''''..'
NNNNWNXXNNNNWWNWNNXXXXXKKXKxl:;;;;;;;,,,;;,,;:coodxxxkkkkOOOOO0000O00OOKXXKOkxdoollcccccccclc:::::::::;::::cllodxkk0KXNWMMMMMMMMMMMMMMMMMMMMMMMMMWWWMMMMMMMWWWWWNNKOxl:;;;;;::::;,,,,,;;;,,,,,''...''..'
NWWNNWWNNXKXNNWNNNXXXXNXXXXKKkl:;;;;;;;;;;,,,;;:clodddxxkkOOOOkkkO0000000OKXNWNXKK00OOOOOOOOOOOOOOOO0OOOO00KKXNNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWMMMMMMWWWWNKkdlc;,;::::ccccccc::;;;;;;;;,,,,'''''.',
WWWNNNWNNNNNNNWNNNNNNNXXXXKXNNXklc:::;;;;;;;;;;;;:cloodddxkkkOOOkkkkxOK00OOOO0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMWMMMMMMMMWWWWWWWKd:::cccllccllllllcccc::;;;;;;;;;;,,,,''..
NWWNNWWWWWNNNXNWWNNNNNNXXNXNNNNNXOdc::;;;;;;;;;;;;;;:clooddxkkkkkkxxxkO000OOOkkOKXWMMMMMMMMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWNWMMMMMMMMWMWWWWWWWKdcclodoolllllllllcc::::;;:;;;;;;;;;,,,,''
NNNNNNWWNNXKXKXNNWNNNWWNNNNNNNNNNNXOdc::::;;;;;;;;;;;;;:cloddxxxkkxxxxxkOOOOOkkxdxOXNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWMMMMMMMMMMWWWNNWWWWWXK0kxddoolloooollcccccc:;;;;;;;;;;;;;;,,,
NNWWWWNNNNNNNNNNNWWNNWWWWWNXNNNNNNNNX0dc::::;;;;,;,,;,,,,;cloooddxkkkkxxxddxO0xdddxxO0KNWMMMWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWNNWWWWWMMMMMMMMMMWWWNKKXNWWWWMMWNKOxooooooollcccccc:::::;;;;;;;;;;;;;
WNNNWNNNNNWNWNNNNWWWWNNNNWWNNXXXNNNNNNNKkl::::;;;,,;:;,'',,,:llooodxxkkkxxxdxkkxOOO0OkkO0KNWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWMMWWMMMMMMWWWWWNNWWWWNNWWWWMMMMMWNKOxdolollclllcccccc::::;;;;;;;;;,
NWNXNNNNNNNWWNNNXKXWNXXNNNXNWNXNNNNXXNNNNKOdc:::;;,;:;,',,,,,,;cllloodxkkkxxxddxO0KK0O00kxk0XNNWMMMMMMMMMMMMMMMMMMMMMMMMMWNNNNNWWWMMMMMMMMMMMMWNNNNWWWMMMMMWWMMMMMMMWWMMWWX0kdoooollllccc:cc:::::;;;;;;,
NNNXNNNNNNNWNNNXXXNWNNXXNX0KNNNNXXXXXNNNNNNNKkl::;;;;,,,,,;,,,;,,;:cllodxxkxxxxxddk0KK000OkxxkO00XWMMMMMMMMMMMMMMMMMMWWWWNWWMMMMWWMMMMMMMMMMWWNXNNWWMMMMMMMMMMMMMMMMWWWMMWMMWNK0kddooollcccccc:::::;;;;;
NNXXXXNNNXNNNNNKKNNNWWWNNNXXKXNNNXNNNNNNNNNNWNXOd:;;,;;;,,,,,,;,,,,;:clloodxxxxxxdddxOKXXKOkkkxddkXWMMMMWMWNXNMMMMWWWWNWWWWMMMMMWMMMMMMMMMWNNWWWWWMMMMMMMMMMMMMMMMMMMMMMWWMMMMMMNXKOkdolllccccccc::;;;;;
NNXXNNNNXXNNNNWN0k0XNWWNNNNXKKNNNNNWWWWNNNNNNNNNXOko:;:;;;;;;,,,,,,,,,;:clllodxxxxddddxk0KX0OkdlclkNWWWWWMMWWWWWMMWWMMMMMMMMMWWWMMMMMMWWWMWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWMMMMMMMWNX0xdllcccccc:::::::
NNXNWNWNXNNNNXXNXOOKNWNNXNWNNNNNNWNWWWWWNNNNNNXKXNN0oc::::;;;;;;;;,,,,,,;:cllloodxxddddoox0Okxolcd0KKNWWWMMMMMMMMMMMWMMMMMMWNNWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNXOdlcccccccccc::
*/
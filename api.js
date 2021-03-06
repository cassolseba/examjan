// includo express
const express = require('express')
// includo bodyParser per HTTP Post
const bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');

//creo il server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// necessario per scrittura
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// definisco la porta
const PORT = process.env.PORT || 3000

//definisco l'oggetto games
var games = []

// funzione per valutare se sono nel range
var range = function (a) {
    return (Number.isInteger(a) && a>=-10 && a<= 10)
}

// get
app.get('/games', (req, res) => {
    // controllo che ci siano partite nella pila
    if(games.length!=0) {
        // ritorno games in Json
       res.json(games);
    } else {
        // ritorno 404 se non ci sono partite
        res.sendStatus(404)
    }
})

// get su games/:id
app.get('/games/:id', (req, res) => {
    // richiedo la partita con l'id specificato
    const index = games.findIndex((item) => {return item.id === req.params.id})
    if(index!=-1) {
        //se è stato trovato lo ritorno
        res.json(games[index])
    } else {
        //se non è stato trovato do errore
        res.sendStatus(404)
    }
})


// post
app.post('/games', (req, res) => {
    const guardia = req.body.guardia
    const ladro = req.body.ladro
    
    // per procedere devo controllare che guardia e ladro non siano null
    // devo controllare che guardia e ladro siano nel range
    // devo controllare che guardia e ladro non siano uguali
    if(guardia!=null && ladro != null && range(guardia) && range(ladro) && guardia!=ladro) {
        // definisco un id da assegnare alla partita
        var new_id = uuidv1();
        // definisco l'oggetto new_game con l'id, la guardia, il ladro e la variabile booleana catturato
        const new_game = {id:new_id, guardia:guardia, ladro: ladro, catturato:false}
        //aggiungo alla pila games il new_game
        games.push(new_game);
        // se la post va a buon fine ritorna 201
        res.status(201)
        // ritorna l'oggetto new_game in json
        res.json(new_game)
        // lo rende visibile da terminale
        console.log(games);
    } else {
        // se non va a buon fine ritorna 400
        res.sendStatus(400)
    }
})

// funzione patch
app.patch('/games/:id', (req, res) => {
    //definisco index
    const index = games.findIndex((item) => { return item.id===req.params.id})
    const guardia = req.body.guardia
    const ladro = req.body.ladro
    // controllo che index sia valido, se non è già stato catturato il ladro e che uno tra guardia e ladro non sia null
    if (index!=-1 && games[index].catturato!=true && (guardia!=null || ladro!=null)) {
        // se guardia non è null ed è nel range
        if(guardia != null && range(guardia)) {
            games[index].guardia = guardia
            // se le posizioni corrispondono setto catturato a true
            if (games[index].guardia == games[index].ladro) games[index].catturato=true
            // ritorno la partita
            res.send(games[index])
        // se ladro non è null ed è nel range
        } else if (ladro != null && range(ladro)) {
            games[index].ladro=ladro
            // se le posizioni corrispondono setto catturato a true
            if (games[index].guardia == games[index].ladro) games[index].catturato=true
            // ritorno la partita
            res.send(games[index])
        } else {
            // non si è verificato nessun caso quindi codice di errore
            res.sendStatus(400)
        }
    } else {
        // condizione non valida quindi segnalo errore
        res.sendStatus(400)
    }
})

// metto il server in ascolto sulla porta definita sopra
app.listen(PORT, () => console.log('App listening on port' + PORT))

module.exports = {app};
const fetch = require("node-fetch");

// const url = 'http://localhost:3000';
const url = "https://examjan.herokuapp.com"

var id;

// test case valid post
test('valid post', () => {
    expect.assertions(1);
    return fetch(url+'/games', {
        // metodo POST
        method: 'POST',
            // passo il contenuto del body, ovvero guardia e ladro
            body: JSON.stringify({guardia: -3, ladro: 4}),
            // passo il contenuto dell'headers
            headers: {
                'Content-Type': 'application/json',
            },
    })
    .then(r => {
        // mi aspetto di ricevere 201 come status
        expect(r.status).toEqual(201);
        // ritorno il json
        return r.json();
    })
    .then(rjson => {
        // prendo l'id
        id = rjson.id
        // lo visualizzo su terminale
        console.log(id)
    })
});

// test case invalid post con la stessa posizione di guardia e ladro
test('invalid post same position', () => {
    expect.assertions(1);
    return fetch(url+'/games', {
        method: 'POST',
            // passo la stessa posizione di guardia e ladro
            body: JSON.stringify({guardia: -3, ladro: -3}),
            headers: {
                'Content-Type': 'application/json',
            },
    })
    // mi aspetto di ricevere 400
    .then(r => expect(r.status).toEqual(400));
});

// test case invalid post con parametri errati
test('invalid post bad parameters', () => {
    return fetch(url+'/games', {
        method: 'POST',
            // passo solo il valore della guardia
            body: JSON.stringify({guardia: -3}),
            headers: {
                'Content-Type':'application/json', 
            },                   
    })
    // mi aspetto di ricevere 400
    .then(r => expect(r.status).toEqual(400));
});

// test case valid patch
test('valid patch', () => {
    expect.assertions(1);
    return fetch(url+'/games/'+id, {
        method: 'PATCH',
            // passo solo il valore del ladro
            body: JSON.stringify({ladro: -3}),
            headers: {
                'Content-Type': 'application/json',
            },
    })
    .then(r => {
        // mi aspetto di ricevere 200
        expect(r.status).toEqual(200);
        return r.json();
    })
    .then(rjson => {
        // visualizzo json su terminale
        console.log(rjson);
    });
});
    
// test case invalid patch
test('invalid patch', () => {
    expect.assertions(1);
    return fetch(url+'/games/'+id, {            method: 'PATCH',
         // passo un valore di ladro oltre il 10
        body: JSON.stringify({ladro: 20}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(r => {
        //mi aspetto di ricevere 400
        expect(r.status).toEqual(400);
    });
});
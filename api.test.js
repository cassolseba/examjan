const fetch = require("node-fetch");

const url = 'http://localhost:3000';


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
    // mi aspetto di ricevere 201 come status
    .then(r => expect(r.status).toEqual(201));
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
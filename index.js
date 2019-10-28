const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

server.get('/', (req, res) => {
    res.send('Testing from get')
})


//GET /api/users return full array of user data

server.get('/api/users', (req, res) => {

    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({err: 'failed to retrieve users'})
    });
});


//POST /api/users create user with info in req body

server.post('/api/users', (req,res) => {




})







//GET /api/users/:id return specified data based on user id

//DELETE /api/users/:id remove user with specified id

//PUT /api/users/:id update information based on id, with data from request body. returns modified user object, not original



const port = 5000;


server.listen(port, () => {
    console.log(`
    \n=== API ON PORT ${port} ===\n`);
})


// {
//     name: "Jane Doe", // String, required
//     bio: "Not Tarzan's Wife, another Jane",  // String
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }
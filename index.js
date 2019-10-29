const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

server.get('/', (req, res) => {
    res.send('Testing from get')
})


//GET /api/users return full array of user data -- working

server.get('/api/users', (req, res) => {

    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved."})
    });
});


//POST /api/users create user with info in req body  -- working

server.post('/api/users', (req,res) => {
    const userData = req.body;

    db.insert(userData)
    .then( user => {
        console.log(user)
        if (req.body.name === undefined || req.body.bio === undefined){
            res.status(400).json({err: "Please provide a name and bio for this user"})
        } else {
            res.status(201).json(userData);
        }
    })
    .catch(err => {
            console.log(err);
            res.status(500).json({error: "There was an error while saving the user to the database" })
    });
});



//GET /api/users/:id return specified data based on user id -- WORKING! Missing 'S' in /api/userS/:id


server.get('/api/users/:id', (req,res) => {

    db.findById(req.params.id)
    .then(user => {
        console.log('get by id then ', req)
        // console.log(user);
        
        if (user !== null || user !== undefined || user !== {} ){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    // .then(console.log(`return the user object here`))
    .catch(err => {
        console.log('get by id catch ', req)

        res.status(500).json({error: "The user information could not be retrieved." })
    });
});

// // ? GET '/api/users/:id'
//     server.get('/api/users/:id', (req, res) => {
//         db.findById(req.params.id)
//             .then(user => !!user === true &&
//                 res.status(200).json(user)
//             )
//             .catch(err => res.status(404)
//                 .json({ errorMessage: "The user with the specified ID does not exist." })
//             )
// })




//DELETE /api/users/:id remove user with specified id --works

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then( numRemoved => {
        if (numRemoved === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(202).json(`${numRemoved} records were deleted`);
        }
    })
    .then(console.log(`return the user object here`))
    .catch( err => console.log(err))
})


//PUT /api/users/:id update information based on id, with data from request body. returns modified user object, not original -- works

server.put('/api/users/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then( count => {
        if (count === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else if (req.body.name === undefined || req.body.bio === undefined) {
            res.status(400).json({err: "Please provide a name and bio for this user"})
        }else {
            res.status(202).json(`${count} records were updated`)
        }
    })
    .then(console.log(`return the user object here`))
    .catch(err => console.log(err));
});



const port = 5000;


server.listen(port, () => {
    console.log(`
    \n=== API ON PORT ${port} ===\n`);
})



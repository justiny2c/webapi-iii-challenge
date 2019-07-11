const express = require('express');

const dbPost = require("./postDb.js");

const router = express.Router();

router.get('/', (req, res) => {
    dbPost
    .get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/:id',validatePostId, (req, res) => {
    const id = req.params.id

    dbPost
    .getById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

// router.delete('/:id', (req, res) => {
//     dbPost
//     .remove()
// });

router.put('/:id', validatePostId, (req, res) => {
    const post = req.body
    const id = req.params.id

    dbPost
    .update(id, post)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id

    dbPost
    .getById(id)
    .then(post => {
        if(!post){
            res.status(404).json( {error: "ID not found" } )
        } else {
            next();
        }})
    .catch(error => {
        res.status(500).json( {error: "Something went wrong"} )
    })
};

module.exports = router;
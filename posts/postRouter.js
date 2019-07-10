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

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;
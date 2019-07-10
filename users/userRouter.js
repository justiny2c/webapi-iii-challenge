const express = require('express');

const dbUser = require("./userDb.js");

const dbPost = require("../posts/postDb.js");

const router = express.Router();



router.get('/', (req, res) => {
    dbUser
    .get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/:id', validateUserId, (req, res) => {
    dbUser
    .getById(req.user)
    .then(user => {
        console.log(user)
       res.status(200).json(user) 
    })
    .catch(error => {
        res.status(500).json(error)
    })    
});

router.get('/:id/posts', validateUserId, (req, res) => {
    dbUser
    .getUserPosts(req.user)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    dbUser
    .remove(req.user)
    .then(user => {
        console.log(user)
       res.status(204).end()
    })
    .catch(error => {
        res.status(500).json(error)
    }) 
});

router.put('/:id', validateUserId, (req, res) => {

});

router.post("/:id", validateUser, (req, res) => {

} )

router.post('/', (req, res) => {

});

router.post('/:id/posts', validatePost, (req, res) => {
    dbPost
    .insert(req.body)
    .then(post => {
        console.log(post)
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

//custom middleware

function validateUserId(req, res, next) {    
    dbUser
    .getById(req.params.id)
    .then(user => {
        if(user){
            req.user = req.params.id

            next();
        } else {
            res.status(400).json({ message: "invalid user id" })
        }
        })
    .catch(error => {
        res.status(500).json(error)
    })
};

function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    const post = req.body

    const text = post.text

    if(!post){
        res.status(400).json({ message: "missing post data" })
    } else if (!text) {
        res.status(400).json({ message: "missing required text field" })
    } else {
        next();
    }
};

module.exports = router;

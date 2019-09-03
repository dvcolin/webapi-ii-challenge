const express = require('express');

const Posts = require('./data/db.js');

const server = express();

server.use(express.json());

// GET /api/posts
server.get('/api/posts', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
})

// POST /api/posts
server.post('/api/posts', (req, res) => {
    const post = req.body;

    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Posts.insert(post)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
})




module.exports = server;
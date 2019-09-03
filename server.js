const express = require("express");

const Posts = require("./data/db.js");

const server = express();

server.use(express.json());

// GET /api/posts
server.get("/api/posts", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// POST /api/posts
server.post("/api/posts", (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

// POST /api/posts/:id/comments

// server.post('/api/posts/:id/comments', (req, res) => {
//     const postId = req.params.id;
//     const commentInfo = req.body;

//     server.post('/api/posts/:id/comments', (req, res) => {
//             Posts.findById(postId)
//             .then(post => {
//                 if(post.length !== 0) {
                    
//                 }
//             })
//             .catch(err => {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." });
//             })
        
//     })
// })


// GET /api/posts/:id

server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    Posts.findById(postId)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
})


// GET /api/posts/:id/comments
server.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;

    Posts.findById(postId)
    .then(post => {
        if(post.length !== 0) {
            Posts.findPostComments(postId)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => {
                res.status(500).json({ error: "The comments information could not be retrieved." });
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });

    })
})


module.exports = server;

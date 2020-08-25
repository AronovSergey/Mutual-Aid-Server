const express = require('express');
const router = express.Router();
const posts = require('../lib/posts');

//collections
//return index of all posts
router.get('/', function(req, res, next) {
    res.send(posts.index());
});

//create a new post
router.post('/', function(req, res, next) {
    const { postTitle, postContent } = req.body;
    const id = posts.create(postTitle, postContent);

    res.send({ id });
});

//info on post :id
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    res.send(posts.find(id));
});

//removes an post
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    posts.delete(id);
    res.sendStatus(200);
});

//update an post
router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    const { postTitle, postContent } = req.body;

    posts.update(id, postTitle, postContent);
    res.sendStatus(200);
});

module.exports = router;
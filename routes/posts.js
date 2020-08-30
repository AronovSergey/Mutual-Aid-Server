const router = require('express').Router();
const posts = require('../lib/Posts');


//return index of all posts
router.get('/', async (req, res) => {
    const RESPONSE = await posts.index();
    if(RESPONSE.error){
        res.send(RESPONSE.message)
    } else {
        res.send(RESPONSE.posts)
    };
});

//create a new post
router.post('/', async (req, res) => {
    const RESPONSE = await posts.create(req.body);
    res.send(RESPONSE.message);
});

//info on post :id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const RESPONSE = await posts.find(id);
    if(RESPONSE.error){
        res.send(RESPONSE.message)
    } else {
        res.send(RESPONSE.post)
    };
    ;
});

//removes an post
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const RESPONSE = posts.delete(id);
    if(RESPONSE.error){
        res.send(RESPONSE.message)
    } else {
        res.sendStatus(200)
    };
});

//update an post
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const RESPONSE = await posts.update(id, payload);
    if(RESPONSE.error){
        res.send(RESPONSE.message)
    } else {
        res.sendStatus(200)
    };
});

module.exports = router;
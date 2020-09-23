const router = require('express').Router();
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const verify = require('../middlewares/verifyTokenMiddleware');
const { postValidation } = require('../validation/post');
const { commentValidation } = require('../validation/comment');

//return index of all posts
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.send({posts});
    } catch (err) {
        res.status(400).send("DB Fetching Error");
    }
}); 

//create a new post
router.post('/', verify, async (req, res) => {
    //lets validate the data before we a user
    const { error } = await postValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post(req.body);
        try {
            await post.save();
            res.send({post});
        } catch(err) {
            res.status(400).send("DB Posting Error");
        }
});

//info on post :id
router.get('/:id', verify, async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(400).send('Invalid id');
        res.send({post});
    } catch(err) {
        res.status(400).send("DB Fetching Error");
    }
});

//removes an post
router.delete('/:id', verify, async (req, res) => {
    const id = req.params.id;
    try{
        await Post.remove({ _id: id })
        res.send('post has been successfully removed');
    } catch {
        res.status(400).send("DB Deleting Error");
    }
});

//update an post
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(400).send('Invalid id');
    const { author = post.author, title = post.title, content = post.content } = req.body;
    
    try {
        await Post.updateOne(
            {_id: id},
            { $set: { author, title, content } 
        });
        res.send('post has been successfully updated');
    } catch {
        res.status(400).send("DB Updating Error");
    }
});

//*****************************************//
//Like a post
router.get('/:id/like', verify,  async (req, res) => {
    const postID = req.params.id;

    const post = await Post.findById(postID);
    if (!post) return res.status(400).send('Invalid id');

    const userHandle = req.user._id;
    if(!userHandle) res.status(400).send('Invalid Token');
    
    const like = new Like({ userHandle, postID });
    try {
        await like.save();
        post.likes += 1;
        await post.save();
        res.send(post);
    } catch {
        res.status(400).send("DB Updating Error");
    }
});
//Unlike a post
router.get('/:id/unlike', verify,  async (req, res) => {
    const postID = req.params.id;

    const post = await Post.findById(postID);
    if (!post) return res.status(400).send('Invalid id');

    const userHandle = req.user._id;
    if(!userHandle) res.status(400).send('Invalid Token');

    try {
        await Like.remove({ userHandle, postID });
        post.likes -= 1;
        await post.save();
        res.send(post);
    } catch {
        res.status(400).send("DB Updating Error");
    }
});

//*****************************************//
//Create a comment
router.post('/comments', verify,  async (req, res) => {
    //lets validate the data before we creating a comment
    const { error } = await commentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.body.postID);
    if (!post) return res.status(400).send('Invalid id');

    const comment = new Comment(req.body);

        try {
            await comment.save();
            post.comments += 1;
            await post.save();
            res.send({comment});
        } catch(err) {
            res.status(400).send("DB Posting Error");
        }
});

//Return all comments of a post
router.get('/comments/:id', verify, async (req, res) => {
    const postID = req.params.id;
    console.log(postID)
    try {
        const comments = await Comment.find({postID});
        res.send({comments});
    } catch (err) {
        res.status(400).send("DB Fetching Error");
    }
}); 

//removes an comment
router.delete('/comments/:id', verify, async (req, res) => {
    const id = req.params.id;

    const comment = await Comment.findById(id);
    if (!comment) return res.status(400).send('Invalid id');

    const post = await Post.findById(comment.postID);

    try{
        post.comments -= 1;
        await post.save();
        await Comment.remove({ _id: id })
        res.send(comment);
    } catch {
        res.status(400).send("DB Deleting Error");
    }
});



module.exports = router;
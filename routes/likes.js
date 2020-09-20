const router = require('express').Router();
const Like = require('../models/Like');
const User = require('../models/User');
const verify = require('../middlewares/verifyTokenMiddleware');

//return index of all like by by post id
router.get('/:id', verify, async (req, res) => {
    const postID = req.params.id;

    const userID = req.user._id;
    if(!userID) res.status(400).send('Invalid Token');

    try {
        const likes = await Like.find({ postID, userID });
        const like = likes[0];
        console.log(like);
        res.send(like ? true : false);
    } catch (err) {
        res.status(400).send("DB Fetching Error");
    }
}); 

//create a new post
router.post('/', verify, async (req, res) => {
    const { postID } = req.body;

    const userID = req.user._id;
    if(!userID) res.status(400).send('Invalid Token');

    const like = new Like({ userID, postID });
    try {
        await like.save();
        res.send({ like });
    } catch(err) {
        res.status(400).send("DB Posting Error");
    }
});

module.exports = router;
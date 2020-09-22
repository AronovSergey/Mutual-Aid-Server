const router = require('express').Router();
const Like = require('../models/Like');
const User = require('../models/User');
const verify = require('../middlewares/verifyTokenMiddleware');

//return index of all likes of specific user
router.get('/', verify, async (req, res) => {
    const userHandle = req.user._id;
    if(!userHandle) res.status(400).send('Invalid Token');

    try {
        const likes = await Like.find({ userHandle });
        res.send(likes);
    } catch (err) {
        res.status(400).send("DB Fetching Error");
    }
}); 

//create a new post
router.post('/', verify, async (req, res) => {
    const { postID } = req.body;

    const userHandle = req.user._id;
    if(!userHandle) res.status(400).send('Invalid Token');

    const like = new Like({ userHandle, postID });
    try {
        await like.save();
        res.send({ like });
    } catch(err) {
        res.status(400).send("DB Posting Error");
    }
});

module.exports = router;
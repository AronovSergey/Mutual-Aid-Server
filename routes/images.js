const router = require('express').Router();
const verify = require('../middlewares/verifyTokenMiddleware');

//create a new imageURL
router.post('/', (req, res) => {
    res.send(res.locals.imageURL);
});


module.exports = router;
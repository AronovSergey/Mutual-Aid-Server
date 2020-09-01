const router = require('express').Router();

//create a new imageURL
router.post('/', (req, res) => {
    res.send(res.locals.imageURL);
});


module.exports = router;
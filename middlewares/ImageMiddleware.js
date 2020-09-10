module.exports = (req, res, next) => {
    res.locals.imageURL = `https://mutual-aid.me/images/${req.file.filename}`;
    next();
};
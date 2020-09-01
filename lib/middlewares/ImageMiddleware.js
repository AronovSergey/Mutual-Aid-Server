module.exports = (req, res, next) => {
    res.locals.imageURL = `http://46.101.210.202/images/${req.file.filename}`;
    next();
};
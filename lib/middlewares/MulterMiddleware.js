const FILE_SIZE_LIMIT_IN_MB = 5;
var multer = require('multer');
var path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb){
        cb(null, `${Date.now()}${file.originalname}`)
    }
});

// Reject a file
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Image Posting Error : Wrong File Type'), false);
    }
}

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * FILE_SIZE_LIMIT_IN_MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
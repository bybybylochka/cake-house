const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resource/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
})

const loader = multer({
    storage: storage,
    fileFilter : (req, file, callback) => callback(null, true),
})

module.exports = loader
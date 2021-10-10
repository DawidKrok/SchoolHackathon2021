const fs = require("fs")
const path = require("path")
const IMAGE_UPLOAD_PATH = path.join(__dirname, '..', 'public', 'img', "shared", "uploaded")

/** =============
 *  IMAGE STORAGE
    =============*/

const multer = require("multer")
// file storaging settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGE_UPLOAD_PATH)
    },
    filename: (req, file, cb) => {
        cb(null,  Math.random().toString(36).substring(2, 15) + file.originalname)
    }
})
// file Filter to reject files that don't meet our standards
const fileFilter = (req, file, cb) => {
    // if second parameter expression is false, reject file
    cb(null, 
        file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'
    )
}
// multer generates middleware to use in routers, that'll add files in specified storage
const upload = multer({storage: storage, fileFilter: fileFilter})



// &&&&&&&&&&&&&&&| MANAGING IMAGES |&&&&&&&&&&&&&&&&&

// jest send status based on whether file was successfully saved or not
const saveImage = (req, res) => {
    // if there was no middleware to upload File, or file sent didn't match our standards
    if(!req.file)       return res.sendStatus(403)

    res.sendStatus(202)
}

// deletes Image from
const deleteImage = (req, res) => {
    if(!req.body.filename)      return res.sendStatus(403)

    try {
        fs.unlinkSync(path.join(IMAGE_UPLOAD_PATH, req.body.filename))
        res.sendStatus(202)
    } catch(err) {
        res.status(400).send()
        console.error(err)
    }

} 

module.exports = {
    upload,
    saveImage,
    deleteImage
}
const router = require ("express").Router()
const multer = require ("multer")
let Pitch = require("../models/newPitch.model")
let path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


router.route("/").get((req, res) => {
Pitch.find()
.then(pitchs => res.json(pitchs))
.catch(err => res.status(400).json("Error: " + err))

})


router.route("/add").post(upload.single('file'), (req, res, next) => {
var obj =  {title :req.body.title,
 content : req.body.content,
 user : req.body.user,
 img : req.body.img,
 file : {data: fs.readFileSync(path.join("./images/" + req.file.filename)), encoding: "UTF-8"},}

const newPitch = new Pitch (obj);

newPitch.save()
    .then(() => res.json("Bien ouej"))
    .catch(err => res. status(400).json("Error : " + err));

})

router.route("/:id").get((req, res) => {
    Pitch.findById(req.params.id)
    .then(pitch => res.json(pitch))
    .catch(err => res.status(400).json("Error:" + err));
})

router.route("/:id").delete((req, res) => {
    Pitch.findByIdAndDelete(req.params.id)
    .then(() => res.json("DELETED"))
    .catch(err => res.status(400).json("Error:" + err));
})

router.route("/update/:id").post((req,res) => {
    Pitch.findByIdAndUpdate(req.params.id)
    .then(pitch => {
        pitch.title = req.body.title
        pitch.content = req.body.content
        pitch.user = req.body.user
        pitch.img = req.body.img
        pitch.file = req.body.file

    pitch.save()
    .then(()=> res.json("pitch updated!"))
    .catch(err => res.status(400).json("Error:" + err));
})
.catch(err => res.status(400).json("Error:" + err));

})


module.exports = router; 
const express = require('express');
const router1 = express.Router();
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
const postController = require("../controllers/postController");



// creating multer storage
const storage1 = multer.diskStorage({
    destination:(req,filename,callback)=>{
        callback(null,path.join(__dirname,'../public/postimages'),(err,pass)=>{if(err){console.log("yeaah error ");}});
    },
    filename:(req,filename,callback)=>{
        const name = Date.now()+ ":>" + filename.originalname;
        callback(null,name,(err,pass)=>{if(err){console.log("yeaah error ");}})
    }
});
const upload = multer({storage:storage1});

router1.post('/create', upload.single("image"),postController.createPost);

router1.get("/",(req,res)=>{
    console.log("hello");
    res.send(bodyParser.json);
})

module.exports = router1; 
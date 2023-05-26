const posts = require("../models/postModel");

const createPost = async (req,res)=>{
    console.log("oh yeah");
    try {
        const post = new posts ({
            title: req.body.title,
            date: req.body.date,
            image: req.file.filename
        });
       const postData = await post.save();
       res.status(200).send({sucess:true,msg:"post data",data: postData});
       console.log("send ");

        
    } catch (error) {
        res.status(400).send({sucess: false ,msg:error.message});
        console.log("error ");
    }
}

module.exports = {
    createPost,
};

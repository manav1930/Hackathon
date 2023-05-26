const jwt = require("jsonwebtoken");
const user3 = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// authentication

const isAuthanticated = async (req,res,next)=>{
        const {token} = JSON.parse(req.headers.authorization);
        // console.log(req.cookies);
        // console.log( req.headers);


        if(!token){
            console.log("token not found");
            return next(new errorResponse("you must login to access this content",400));
        }

        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await user3.findById(decoded.id);
            next();
        } catch (error) {
            return next(new errorResponse("you must login to access this content err",400));

        }
};

module.exports = {
    isAuthanticated,
}
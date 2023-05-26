const user = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


// for sign up 
const signup = async (req,res,next)=>{
    const {email } = req.body;
    const userExists = await user.findOne({email});
    // console.log(req.body);
    if (userExists) {
        return  next(new ErrorResponse('E-mail already exists', 400));
    };

    try {
        const user1 = await user.create(req.body);
        res.status(201).json({
            sucess:true,
            user1
        }) 
    } catch (error) {
        console.log('error');
        res.status(400).json({
            sucess:false,
            message:error.message
        })
    }
    // res.json({message: "hello controller working of user "});
    // console.log("{message: hello controller working of user }");
};

// for login 

const signin = async (req,res,next)=>{
    const {email,password } = req.body;
    const userExists = await user.findOne({email});

    try {
        if(!email || !password){
            return  next(new ErrorResponse('E-mail and password are required', 400));
        };
        // checking here user email
        const user1 = await user.findOne({email});
        if(!user){
            return  next(new ErrorResponse('Invalid credentials', 400));
        } ;

        // verifying password
        const isMatched = user1.comparePassword(password);
        if(!isMatched){
            return  next(new ErrorResponse('Invalid credentials', 400));
        };


        // res.status(201).json({
        //     sucess:true,
        //     token
        // });

        generateToken(user1,200,res);

    } catch (error) {
        console.log(error);
        next(new ErrorResponse('Cannot log in, check your credentials', 400));
    }
    // res.json({message: "hello controller working of user "});
    console.log("{message: hello controller working of user }");
};

// generating token 
const generateToken = async (user1,statusCode,res)=>{
    const token  = await user1.jwtGenerateToken();
    const expiresIn = process.env.EXPIRES_TOKEN || 3600000; 
    // const options = {
    //     httpOnly:true,
    //     expires: new Date(Date.now() + process.env.EXPIRES_TOKEN),
    // };
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(expiresIn)),
      };

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        sucess:true,
        token
    })
};

// logout and clearing cookie
const logout = async (req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({
        sucess:true,
        message:"logged out",
    })
};
 
// single user 

const singleUser = async (req,res,next)=>{
        try {
            const  user2 = await user.findById( req.user.id);
            res.status(200).json({
                sucess:true,
                user2
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
};

// user profile 

const userProfile = async(req,res,next)=>{
    console.log("yeah in userprofile");
    const userid = req.user.id
    const userprof = await user.findById(userid);
    res.status(200).json({
        success:true,
        userprof,
    });
};


module.exports = {
    signup,
    signin,
    logout,
    singleUser,
    userProfile,
};
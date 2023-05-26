const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fname: {
        type:String,
        trim:true,
        required:[true, "plz add your name here"],
        maxlength:32
    },
    lname: {
      type:String,
      trim:true,
      required:[true, "plz add your name here"],
      maxlength:32
  },
    email: {
        type:String,
        trim:true,
        required:[true, "plz add your email here"],
        unique:true,
        // match:[/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ ,
        //      'Please enter a valid email address']
    
    },
    password: {
        type:String,
        trim:true,
        required:[true, "plz add valid password here"],
        minlength:[6,"plz a valid six(6) character password"],
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
        //     'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character'
        //   ]
    
    },
    confirm_password: {
      type: String,
      trim:true,
        required:[true, "plz add valid password here"],
        minlength:[6,"plz a valid six(6) character password"],
    },
    colloge:{
      type:String,
      trim:true,
    },
    year:{
      type:Number,
    },
    gender:{
      type:String,
      trim:true
    },
    mobileNumber:{
      type: Number,

    },
    branch:{
      type: String,
      trim:true
    },
    field:{
      type:String,
      trim:true
    }
    ,

    role:{
        type:Number,
        default:0, // here 0 for user , 1 for admin 
    }

} , {timestamps:true});


// here we encrypting the password with bcrypt

userSchema.pre('save', async function (next) {
    if (!this.isModified('password' || 'confirm_password')) {
      return next();
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
      this.confirm_password = await bcrypt.hash(this.confirm_password, 10);

      return next();
    } catch (error) {
      return next(error);
    }
  });
  

// userSchema.pre('save',async (next)=>{
//     if(!this.isModified('password')){
//         next();
//     }
//     this.password = await bcrypt.hash(this.password,10);
// });


// verifying the password

userSchema.methods.comparePassword = async function (password,confirm_password) {
    try {
      return await bcrypt.compare(password, this.password);
      return await bcrypt.compare(confirm_password, this.confirm_password);

    } catch (error) {
      throw new Error(error);
    }
  };

// using json web token 

userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,{
        expiresIn:3600
    });
}


module.exports = mongoose.model("user",userSchema);
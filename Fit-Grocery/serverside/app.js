// importing modules 
const express = require("express");
require('dotenv').config();
const mongooseCon = require("mongoose");
const router = require("./routes/userRoute");
const router1 = require("./routes/postRoutes");
const bodyParser = require("body-parser");
const morgan  = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandller = require('./middleware/errors');


const app = express();
// main middleware
app.use(express.static('public'));

// using port from .env file
const port = process.env.PORT || 5069;
// 6969
// connection to the database 
mongooseCon.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
.then(()=>{console.log("database connected ...");})
.catch((error)=>{console.log(error);});

// middleware works 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended
    :true}));
app.use(cors());
app.use(cookieParser());

// error middle wares
app.use(errorHandller.errorHandler);

// routes middle ware
app.use("/",router1);
app.use("/",router); 


// listening to the port 
app.listen(port,()=>{
    console.log(`listening to the ${port}...`);
});
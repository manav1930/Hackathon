const express = require("express");
const Hello   = require("../controllers/userController");
const router = express.Router();
const authuser = require("../middleware/userAuth");

router.post("/signup",Hello.signup);
router.post("/signin",Hello.signin);
router.get("/logout",Hello.logout);
router.get("/user/:id",Hello.singleUser);
router.get("/signin",Hello.signin);
router.get("/userprofile",authuser.isAuthanticated, Hello.userProfile);




module.exports = router ;

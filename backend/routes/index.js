const express = require("express");
// Step 1 : defining a router
const router = express.Router();

// importing the user route
const userRoute = require("./user");
const accountRoute = require("./account");

router.use("/user",userRoute); 
router.use("/account",accountRoute); 



module.exports = router;
// /api/v1 



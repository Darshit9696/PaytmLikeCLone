const express = require("express");
// Step 1 : defining a router
const router = express.Router();

// importing the user route
const userRoute = require("./user");

router.use("/user",userRoute); 

module.exports = router;
// /api/v1 



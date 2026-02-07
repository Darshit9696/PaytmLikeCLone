const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const zod = require("zod");
const { authMiddleWare } = require("./Auth");

const router = express.Router();

const signupSchema = zod.object({

    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
});


router.post("/sign-up", async (req, res) => {
  const { username,password,firstName,lastName } = req.body;
  const { success } = signupSchema.safeParse(req.body);

  if(!success)
  {
    return res.json({
        msg : "Email id already taken / Incorrect Inputs"
    })
  }

  const isFound = await User.findOne({ username });

  if(isFound){
    return res.status(400).json({
      msg: "User already exists"
    });
  }

  await User.create({
    username,
    password,
    firstName,
    lastName
  });

  res.json({
    firstName,
    lastName,
    username,
  });
});

router.post("/sign-in",async(req,res) => {
    const {username,password} = req.body;

  const isFound = await User.findOne({ username,password });

  if(!isFound){
    return res.status(401).json({
      msg: "Invalid credentials"
    });
  }

  // create token
  const token = jwt.sign(
    { userId: isFound._id },
    JWT_SECRET
  );

  res.json({
    msg: "Signed in successfully",
    token: token
  });
});

const updateBody = zod.object({

    username : zod.string().optional(),
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
});

// auth middleware extracts the jwt and verifies it and decodes it into the user id and that user id can be used directly 
router.put("/update",authMiddleWare,async(req,res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success)  
    {
        return res.status(403).json({msg : " Error while updating information "})
    }

    await User.updateOne(
        { _id: req.userId },
        req.body
    )

    res.json({
        message : "Updated succesfully"
    })

})

module.exports = router;

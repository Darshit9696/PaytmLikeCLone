const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("./Auth");
const { User,Account } = require("../db");
const mongoose = require("mongoose");

// balance
router.get("/balance", authMiddleWare, async (req, res) => {
   // logic
   const account = await Account.findOne({
        userId: req.userId
  });

  res.json({
    balance: account.balance
  });

});

// transfer
router.post("/transfer", authMiddleWare, async (req, res) => {
   // transaction logic
  //  make sure  ki changes arent committed until the whole operation is over 
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const {amount , to} = req.body;

        const sender = await Account.findOne({
            userId: req.userId
        }).session(session);

        if(!sender || sender.balance < amount)
        {
            await session.abortTransaction();
            return res.status(400).json({
            message: "Insufficient balance"
            });
        }

        const receiver = await Account.findOne({
            // Return the document whose userId equals this exact value. to will be sent by the frontned  
            userId : to
        }).session(session);

        if(!receiver)
        {
            await session.abortTransaction();
            return res.status(400).json({
            message: "Receiver not found "
            })
            
        }

        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }  
            ).session(session);


            await Account.updateOne(
            { userId: to },
            // increment :  oldBalance + amount
            { $inc: { balance: amount } }
            ).session(session);

             await session.commitTransaction();

            res.status(200).json({
            message: "Transfer successful"
            });

    }catch(err)
    {
        await session.abortTransaction();
        res.status(500).json({message : "Transfer failed"});
    }finally{
        session.endSession();
    }

});

module.exports = router;

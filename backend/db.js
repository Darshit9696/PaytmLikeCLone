const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

console.log("MONGO_URL:", process.env.MONGO_URL);


// USER SCHEMA
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);


// ACCOUNT SCHEMA (REFERENCE)
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  balance: Number
});

const Account = mongoose.model("Account", accountSchema);


// EXPORT
module.exports = {
  User,
  Account
};

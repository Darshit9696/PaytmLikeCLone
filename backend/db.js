const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://bhattdarshit11_db_user:Mongo12345@cluster0.ui1qbhs.mongodb.net/PaytmBackend?retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
// user schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});


// user model
const User = mongoose.model("User", UserSchema);

// export model
module.exports = {
  User
};

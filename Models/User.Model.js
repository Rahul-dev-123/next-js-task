
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : { type :String, required : true },
    email : {type : String, required : true, unique : true},
    mobile : { type : Number, required : true},
    gender : { type : String, required : true},
    password : {type : String, required : true}
})



module.exports = mongoose.models.UserModel || mongoose.model("UserModel", UserSchema)
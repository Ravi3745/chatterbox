const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    name:{ type:String,required:true },
    email: {type:String,required:true, unique:true},
    password:{type:String, required:true},
    pic:{
        type:String, 
        default:"https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
    },
},{timestamps:true});



module.exports.User = mongoose.model("User", userSchema);
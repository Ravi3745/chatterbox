const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    name:{ type:String,require:true },
    email: {type:String,require:true},
    password:{type:String, require:true},
    pic:{
        type:String, 
        require: true, 
        default:"https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
    },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
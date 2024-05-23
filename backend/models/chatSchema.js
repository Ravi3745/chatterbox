const mongoose = require('mongoose');
// chatname
// isgroupchat
// users
// latest message
// groupAdmin 

const chatSchema = mongoose.Schema({

    chatName:{type:String, trim:true},
    isGroupChat:{type:Boolean, default:false},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },

    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

module.exports.Chat = mongoose.model("Chat",chatSchema);

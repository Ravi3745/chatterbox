const expressAsyncHandler = require("express-async-handler");
const { Chat } = require('../models/chatSchema');
const { User } = require("../models/userSchema");



const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body
    console.log(userId, "in chat access controller");
    if (!userId) {
        console.log("userId not send with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email",

    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
                "users",
                "-password"
            );

            res.send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }

});


// fetching chats for user
const getChats = expressAsyncHandler(async (req, res) => {
    try {
        let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

        chats = await User.populate(chats, { path: "latestMessage.sender", select: "name pic email" });
        res.send(chats);

    } catch (error) {
        throw new Error(error.message);
    }
});


const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "please fill all details" });
    }
    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("more than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {

    }
});

const renameGroup  = expressAsyncHandler(async(req,res)=>{
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName},{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(400);
        throw new Error("chat Not found");
    }else{
        res.json(updatedChat);
    }
});

const addToGroup = expressAsyncHandler(async (req,res)=>{
    const {chatId,userId} = req.body;

    const addUser = await Chat.findByIdAndUpdate(
        chatId,{
            $push:{users:userId},
        },
        {new:true}
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!addUser){
        res.status(400);
        throw new Error("chat not found");
    }else{
        res.json(addUser);
    }

});



const removeFromGroup = expressAsyncHandler(async (req,res)=>{
    const {chatId,userId} = req.body;
    console.log("iam here in ")
    const userRemoved = await Chat.findByIdAndUpdate(
        chatId,{
            $pull:{users:userId},
        },
        {new:true}
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!userRemoved){
        res.status(400);
        throw new Error("chat not found");
    }else{
        res.json(userRemoved);
    }

})


module.exports = { accessChat, getChats, createGroupChat, renameGroup, addToGroup ,removeFromGroup}
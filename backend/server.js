const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;


app.get('/',(req,res)=>{
    res.send("hii in node")
});

app.get('/chats',(req,res)=>{
    res.status(200).send(chats);
});

app.get('/chats/:id',(req,res)=>{
    console.log(req.params.id);
    const chat=chats.find(c=>c._id===req.params.id);
    res.send(chat);
})
app.listen(PORT,()=>{
    console.log(`server is up and running ${PORT}`);
});
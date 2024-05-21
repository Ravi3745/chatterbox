const express = require("express");
// const dotenv = require("dotenv");
const cors = require('cors');
const { chats } = require("./data/data");
const connectDB = require("./config/db");

const app = express();
// node --env-file .env ./backend/server.js use this command for latest veresion of node
connectDB(); 
const PORT = process.env.PORT || 8000;
console.log(process.env.PORT)

app.use(cors());
  
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
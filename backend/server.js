const express = require("express");
// const dotenv = require("dotenv");
const cors = require('cors');
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes =require('./Routes/messageRoutes');
const {errorHandler,notFound} = require('./middleware.js/errorMiddleware');
const app = express();
// node --env-file .env ./backend/server.js use this command for latest veresion of node
connectDB(); 
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)

app.use(cors());

// for parsing the data comming from front end;
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("hii in node")
});

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);

app.use(notFound);
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`server is up and running ${PORT}`);
});
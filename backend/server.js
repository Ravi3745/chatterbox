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
const server = app.listen(PORT,()=>{
    console.log(`server is up and running ${PORT}`);
});

const io = require('socket.io')(server,{
    pingTimeou:60000,
    cors:{
        origin:"http://localhost:5173",
    }
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        
        socket.emit('connected');
    });


    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('user joined room', room);
        
    });


    socket.on('new message',(newMessageRecieved)=>{
        let chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user=>{
            if(user._id === newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })
    });

    socket.on('typing',(room)=>socket.in(room).emit('typing'));
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));

    socket.off("setup", ()=>{
        console.log("User disconnected");
        socket.leave(userData._id);
    })
});
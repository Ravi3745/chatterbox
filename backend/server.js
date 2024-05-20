const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.send("hii in node")
})
app.listen(8000,()=>{
    console.log("server is up and running");
});
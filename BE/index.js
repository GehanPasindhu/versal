const express = require("express")
const app = express()

app.use("/", (req,res)=>{
    res.send("Server up")
})

app.listen(5000, console.log("Server is on"));


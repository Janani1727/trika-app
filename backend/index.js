
const express=require("express")
const { connection } = require("./db")

const app=express()
const cors = require('cors');

app.use(cors());
const {dataRouter} = require("./routes/data.route")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/products",dataRouter)

app.listen(8081,async()=>{
    try {
        console.log(connection)
        await connection 
             console.log("connected to db")

    } catch (err) {
        console.log("not connected")
    }
    console.log("server started")
})


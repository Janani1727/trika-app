const mongoose=require("mongoose")

require("dotenv").config()
console.log(process.env.db)
const connection=mongoose.connect(process.env.db)

module.exports={connection}
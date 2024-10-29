const express=require("express")

const {DataModel} =require("../model/data.model")
const dataRouter =express.Router()

dataRouter.get("/", async (req, res) => {
    try {
        const datas = await DataModel.find();
        res.send(datas);
    } catch (error) {
        console.error("Error fetching data items:", error);
        res.status(500).send(error.message);
    }
});


dataRouter.post("/create",async(req,res)=>{
console.log("data route working")
    try {
        const payload=req.body
        console.log(payload)
        const post =new DataModel(payload)
        await post.save()
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})

module.exports={dataRouter}

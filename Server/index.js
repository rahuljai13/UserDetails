const Express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose')

const app = Express ()
app.use (cors())
app.use(Express.json())
const port = process.env.port || 8080

//schema
const schemaData = mongoose.Schema({
    name:String,
    mail:String,
    mobile:Number,
},{
    timestamps:true 
})

const userModel = mongoose.model("user",schemaData)

//read 
//http://localhost:8080/
app.get("/",async(req,res)=>{ 
    const data= await userModel.find({ })

    res.json({success : true, data : data })
})


//create data // save data in mongodb
//http://localhost:8080/create
/*
 {
   name,
   mail,
   mobile
 }
  
*/
  
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data =new userModel(req.body)
    await data.save()
        res.send ({success : true, message: "Data Saved Successfully",data:data})
})
 
//update data
//http://localhost:8080/update
/*
 {
   id:"",
   name:"",
   mail:"",
   mobile:""
   }
*/

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}= (req.body)

    console.log(rest)
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success :true, message:"Data Updated Bro", data:data})
}) 

//delete api
//http://localhost:8080/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)  
    const data =await userModel.deleteOne({_id:id})
    res.send ({success : true,message:"Data Deleted Buddy",data:data })
})


mongoose.connect("mongodb://localhost:27017/Webapp")
.then(()=> {
    console.log("connect to DataBase")
    app.listen(port,()=> console.log ("Server is Running Bro "))  
})
.catch((err)=>console.log(err))
  
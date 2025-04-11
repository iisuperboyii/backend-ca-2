const express = require('express')
const mongoose = require('mongoose')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const port=process.env.PORT

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Connected to MongoDB")
  }).catch(err=>{
    console.log(err)
})

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  dob:{
    type:Date,
    required:true
  },
  password:{
    type:String,
    required:true
}
})
const User = mongoose.model('User',userSchema)

app.post('/signup', (req,res)=>{
  try {
    const {username,email,dob,password}=req.body
    if(!username){
      return res.status(400).json({message:'Username is required'})
    }
    if(!email){
      return res.status(400).json({message:'Email is required'})
    }
    if(password.length<8||password.length>16){
      return res.status(400).json({message:'Password length must e between 8 and 16'})
    }

  const user=new User({username,email,dob,password})
  user.save()
  res.json({message:'User created successfully',user})
  } catch (error) {
    res.status(400).json({message:'Error creating user',err})
    }
  })



app.listen(port,()=>{
  console.log(`Server is running on PORT ${port}`)
})
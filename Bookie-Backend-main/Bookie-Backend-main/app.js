const express = require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json())
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
const mongourl="mongodb+srv://rovind:rovind1409@cluster0.tnxfp3u.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongourl, {
    useNewUrlParser:true
})
.then(()=>{
    console.log("Connected to database");

})
.catch((e)=>console.log(e));
require("./userDetails");

//register
const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


//login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //console.log(user.fname);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({},JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
    }
    res.json({ status: "error", error: "Invalid Password" }); 
});

//name
app.post("/name", async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({ email });
  //console.log(user);
  const uname=user.fname;
  const pname=user.lname; 
  const userName=uname+" "+pname;
  if(userName.length>=1){
  return res.json({status:"ok",data:userName})
  }else{
  return res.json({ error: "error" });
  }
  
});




//cart adding
app.post('/addToCart', async (req, res) => {
  const { email, storage } = req.body;
  const user = await User.findOne({ email });

  if (user.cart.includes(storage)) {
    return res.json({ status: 'already added' });
  }

  user.cart.push(storage);
  user.save();
  res.json({ status: 'ok' });
});




//card retriveing

app.post("/cartretrive", async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({ email });
  
  const cartval=user.cart;
  
  const cartimg=user.cartimg;

  // console.log(cartval);
  if(cartval.length!=0){
  return res.json({status:"ok",data:cartval,data1:cartimg})
  }else{
  return res.json({ error: "error" });
  }
  
});

//cart image
app.post('/cartimg', async (req, res) => {
  const { email, imageLink } = req.body;
  const user = await User.findOne({ email });

  if (user.cartimg.includes(imageLink)) {
    return res.json({ status: 'already added' });
  }

  user.cartimg.push(imageLink);
  user.save();
  res.json({ status: 'ok' });
});



//payment

app.post('/paymentdetais',async (req,res)=>{
  const user = await User.findOne({email:req.body.email})
  user.pay = [];
  for(var i=0;i<req.body.pay.length;i++)
{
  user.pay.push(req.body.pay[i]);
}  
user.save()
//console.log(user);
  res.json({status:"ok"})
})






app.listen(5000, ()=>{
    console.log("Server connected");
});

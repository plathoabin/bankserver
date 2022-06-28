//serever creation

// 1. import express
const express = require('express');

//import jsonwebtoken
const jwt= require('jsonwebtoken')

//import cors
const cors = require('cors')

//import data service
const dataService = require('./services/data.service');

//server app creat using express
const app = express()

//cors use in server app
app.use(cors({
  origin:'http://localhost:4200'
}))

//parse JSON data
app.use(express.json())

//application spewcific middleware
const appMiddleware = (req,res,next)=>{
  console.log("application specific middleware");
  next()
}

//use middlewarer in app
app.use(appMiddleware)


//bank server
const jwtMiddleware = (req,res,next)=>{
   //fetch token
  try {
   token = req.headers['x-access-token']
   //verify token
   const data = jwt.verify(token,'supersecretkey12345')
   console.log(data);
   next()
}
catch{
   res.status(401).json({
      status:false,
      statusCode:401,
      message:"please log in..."

   })
}

}




 // register API
app.post('/register', (req,res) => {
    //REGISTER SOLVING - asynchronous
    dataService.register(req.body.username, req.body.acno, req.body.password)
    .then(result => {
      res.status(result.statusCode).json(result)
    })
    
    })

 // LOGIN API

 app.post('/login',(req,res)=>{
    //LOGIN SOLVING - asynchronous
    const result = dataService.login(req.body.acno,req.body.pswd)
    .then(result =>{
      res.status(result.statusCode).json(result)
    })
    
    })

// depositAPI
app.post('/deposit',jwtMiddleware, (req,res)=>{
   //LOGIN SOLVING - asynchronous
   const result = dataService.deposit(req.body.acno,req.body.password,req.body.amt)
   .then(result =>{
      res.status(result.statusCode).json(result)
    })
    
   })

   //withdraw API
app.post('/withdraw', jwtMiddleware, (req, res) => {
   //register solving
   dataService.withdraw(req.body.acno, req.body.password, req.body.amt)
   .then(result => {
       res.status(result.statusCode).json(result)

   })
})

//transaction API
app.post('/transaction', jwtMiddleware, (req, res) => {
   //register solving
   dataService.getTransaction(req.body.acno)
   .then(result => {
       res.status(result.statusCode).json(result)

   })
})

//user request resolving

//get request to fetch data
app.get('/',(req,res)=>
{
res.send("GET REQUEST")
})

//post request to create data
app.post('/',(req,res)=>
{
res.send("POST REQUEST")
})
//put request to modify entire data
app.put('/',(req,res)=>
{
res.send("PUT REQUEST")
})
//patch request to modify partially
app.patch('/',(req,res)=>
{
res.send("PATCH REQUEST")
})
//delete rquest to delete data
app.delete('/',(req,res)=>
{
res.send("DELETE REQUEST")
})
//set up port number to the server app
app.listen(3000,()=>
{
console.log("server started at 3000");
})
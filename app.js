const express = require('express');
const bodyparser = require('body-parser');
const mongoose  = require('mongoose');

const port = 5000;

const MoviesRoutes = require('./routes/movies-routes');
const UserRoutes = require('./routes/users-routes');
const app = express();
app.use(bodyparser.json());

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader("Access-Control-Allow-Headers",
    'Origin, X-Requested-With,Content-Type,Accept,Authorization'
   
  );
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
  if(req.method === "OPTIONS"){
    return res.sendStatus(200);
  }
  next();
  
})
app.use('/api/movies',MoviesRoutes);
app.use('/api/users',UserRoutes);



app.use((req,res,next) =>{
  const error = new HttpError("Could not find this route",404);
  throw error;
})
app.use((error,req,res,next) =>{
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occured'});

})
mongoose.connect("mongodb+srv://Dharshan:sampathkumar5251@mydbdata.vdkhw43.mongodb.net/MovieDB?retryWrites=true&w=majority&appName=mydbdata")
.then(
  () =>{
    app.listen(port);
    console.log("Connected successfully")
  }
)
.catch(err =>{
  console.log(err);
})



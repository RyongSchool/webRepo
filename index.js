const  mongoose = require('mongoose');
const express= require('express');
const config= require('config');
const path= require('path');
const resHeader = require('./middleware/resHeader')
const auth = require('./routes/auth');
const books= require('./routes/books');
const users= require('./routes/users');
const error = require('./middleware/error'); 

const app= express();


app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect(config.get('db'), { useNewUrlParser: true } )
  .then(()=>console.log('connected to db'))
  .catch((err)=>console.log('something went wrong'+err));

app.use(resHeader);
app.use('/auth',auth);
app.use('/books',books);
app.use('/users',users)
app.use(error);


const port =process.env.PORT || 8000;
app.listen(port,(res)=>{
  console.log(`listening to port ${port}`)
})
const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser');
const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, 'config.env'),
  });

mongoose.connect('mongodb://localhost:27-17/test',
{
useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex: true,
useFindAndModify: false,
})

const db=mongoose.connection
// db.collection.dropIndexes()

db.once('open',()=>{
    console.log("Database connection")
})

const app=express()

const Productrouter=require('./router/ProductRouter')
const AuthRouter=require('./router/authRouter')
const categoryRouter=require('./router/categoryRouter') 
const commentRouter=require('./router/commentRouter') 

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use('/uploads',express.static('uploads'))

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`)
})

app.use('/product',Productrouter);
app.use('/api',AuthRouter)
app.use('/category',categoryRouter)
app.use('/comment',commentRouter)

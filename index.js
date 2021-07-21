const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser');

mongoose.connect('mongodb://localhost:27-17/test',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true})

const db=mongoose.connection
// db.collection.dropIndexes()

db.once('open',()=>{
    console.log("Database connection")
})

const app=express()

const Productrouter=require('./router/ProductRouter')
const Authrouter=require('./router/authRouter')
const categoryRouter=require('./router/categoryRouter') 

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use('/uploads',express.static('uploads'))

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`)
})

app.use('/product',Productrouter);
app.use('/api',Authrouter)
app.use('/category',categoryRouter)

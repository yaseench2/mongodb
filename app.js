require('dotenv').config()
const express=require('express')
const app=express()

const MongoClient=require('mongodb').MongoClient

const url=process.env.DB_URL
let port=process.env.PORT||4000

const dbClient=new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})

app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

let {getData, addTodo,deleteTodo}=require('./controllers/todo')

dbClient.connect((err)=>{
    if(err){
        console.log('connection failed')
    }
    else{
        console.log('connected')
    }
})

app.get('/',(req,res)=>{
    getData(res,dbClient)
})

app.get('/add',(req,res)=>{
    res.render('addtodo')
})
app.post('/add',(req,res)=>{
    addTodo(req,res,dbClient)
})

app.get('/delete/:id',(req,res)=>{
    deleteTodo(req,res,dbClient)
})

app.listen(port)
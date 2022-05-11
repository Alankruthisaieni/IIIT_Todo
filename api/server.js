const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//creating an express application
const app = express();

app.use(express.json());
app.use(cors());// protect us from cross-origin errors

//below string is what we get when we execute mongo command in cmd locally
//mern-todo is database name 
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",
{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>console.log("connected to database"))
.catch(console.error);

const Todo=require('./models/Todo');
//when we make a request with localhost../todos it will find all todos inside Todo model and pass it in json format
app.get('/todos',async(req,res)=>{
  const todos=await Todo.find();
  res.json(todos);
})

app.post('/todo/new',(req,res)=>{
  const todo=new Todo({
    text:req.body.text
  });
  todo.save();
  res.json(todo);
})

app.delete('/todo/delete/:id',async (req,res)=>{
  const result=await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
})

app.get('/todo/complete/:id',async(req,res)=>{
  const todo=await Todo.findById(req.params.id);
  todo.complete=!todo.complete;
  todo.save();
  res.json(todo);
})

//start the server
app.listen(3001,()=>console.log("server started on port 3001"));
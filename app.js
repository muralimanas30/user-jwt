const express = require('express');
const app = express();
const connectDb = require('./db/connect');
require('dotenv').config()

app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/auth',authRouter)

// const taskRouter = require('./routes/task')
// app.use('/task',taskRouter)

connectDb().then(()=>{
    console.log("Db connected");
    app.listen(process.env.PORT,()=>{
        console.log("App listening");
    })
}).catch(e=>console.log(e))
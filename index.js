const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors= require('cors');
const Meme = require('./models/db');
  

//database_connection
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb+srv://Priyanka:mlabpriyanka@cluster0.8exk6.mongodb.net/test";
const PORT = process.env.PORT || 8081;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.once('error', (err)=>{
        console.log(err);    
    });
    db.on("open", ()=>{
        console.log("database connection success");
    })
    

//middleware
app.use(bodyParser.json())
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(cors());

const memeRouter = require('./routes/memes')
app.use('/memes', memeRouter)

const adminRouter = require('./routes/admin')
app.use('/admin',adminRouter)

app.get('/', (req, res) => { res.send('Hello from Backend Server!')})


app.listen(PORT,()=>{ console.log('server is running')});
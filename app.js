const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/nodekb',{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connections
db.once('open',function(){
    console.log('connected to MongoDB');
});

//Check for db errors
db.on('error',function(err){
    console.log(err);
});

//init app
const app = express();

//Bring in the Model
let Article = require('./models/article');

//load view Engine
app.set('views',path.join(__dirname,'views'));//Views are in the 'views' folder under the curent one
app.set('view engine','ejs');

//Body Parser Middleware (from :body parser github)
//parse application/x-wwwx-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    console.log('----------------');
    console.log('New request :');
    console.log('host: ' + req.hostname);
    console.log('path: ' + req.path);
    console.log('method: ' + req.method);

    next();
});

//Home Route
app.get('/',function(req,res){
Article.find({},function(err,articles){
    if(err){
        console.log(err);
    }else{
        res.render('index',{
            title:'Articles',
            articles: articles
        });
    }
});
});

//Route File
let articles = require('./routes/articles');
app.use('/articles',articles);

//404 error
app.use((req,res)=>{
    res.status(404).render('404',{title : '404 Error'});
});
//Start server
app.listen(3000,function(){
    console.log('server lisning on the port 3000');
});
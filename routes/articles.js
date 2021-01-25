const express = require("express");
const router = express.Router();
let Article = require('../models/article');

//Add Route
router.get('/add',function(req,res){
    res.render('add_article',{
        title:'Article'
    });
});

// Add Submit POST Route
router.post('/add',function(req,res){

 let article = new Article();
 article.title = req.body.title;
 article.author = req.body.author;
 article.body = req.body.body;
 
 article.save(function(err){
     if(err){
 console.log(err);
     } else {
         res.redirect('/');
     }
 });
});  

//Get Single Article

router.get('/:id',function(req,res){
    Article.findById(req.params.id, function(err,article){
       res.render('article',{
           title : 'Article',
           article: article
       });
    });
   });
   
   //Edit Article
router.get('/edit/:id',function(req,res){
   Article.findById(req.params.id, function(err,article){
      res.render('edit_article',{
              title : 'Edit Article',
              article: article
      });
   });
  });
   
   // Update Submit POST Route
router.post('/edit/:id',function(req,res){
   
    let article = {};
   
   article.title = req.body.title;
   article.author = req.body.author;
   article.body = req.body.body;
       
   let query = {_id:req.params.id}
   
   Article.update(query,article,function(err){
       if(err){
   console.log(err);
   return;
       } else {
           res.redirect('/');
       }
   });
});
   
   //DELETE an article
router.delete('/:id',function(req,res){
       let query = {_id:req.params.id}
   
       Article.remove(query,function(err){
           if(err){
               console.log(err);
           }else{
               res.send('Success');
           }
   });
});
   
   
module.exports = router;
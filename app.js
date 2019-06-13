var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var tekstSchema = new mongoose.Schema({naam:String,post:String});
var Tekst = mongoose.model('tekst',tekstSchema);
var arrNaam = [];
var arrPost = [];
// view engine setup
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 3000 , process.env.IP || '0.0.0.0');
//connectie met database
mongoose.connect("mongodb+srv://admin:Project123@projectkk-qrdxb.azure.mongodb.net/tekstform?retryWrites=true", function(err) {
    if (err) throw err;
    console.log("Successfully connected to mongodb");
  });
//post
app.post('/post', function(req, res){
  delete req.body._id;
  var tekstNew = new Tekst(req.body);
  tekstNew.save(function(err){
    if(err)throw err;
      console.log("post saved!!");
  })
  console.log(JSON.stringify(req.body));
  res.redirect('/');
  //res.send("received your request!: "+ JSON.stringify(req.body));
  
});
//get
app.get('/list',function(req,res){
 Tekst.find(null, function(err,docs){
  if(err)throw err;
  arrNaam = [];
  arrPost = [];
  for(var i = 0;i<docs.length;i++){
    arrNaam.push(docs[i].naam);
    arrPost.push(docs[i].post)
  }
  res.render('lijst',{naam: arrNaam, post: arrPost, title:"lijst"});
 });
});
module.exports = app;

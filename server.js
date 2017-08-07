var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');

app.use(express.static("public"));

app.use(formidable());

fs.readFile(__dirname + '/data/posts.json', function (error, file) {
  // console.log(file.toString());
  // var parsedFile = JSON.parse(file);
});

app.post('/create-post', function(req, res) {
  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    var blogPosts = JSON.parse(file);
    var timeStamp = Math.floor(Date.now());
    blogPosts[timeStamp] = req.fields.blogpost
    fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(blogPosts, null, 1), function(error) {
      if(error) { console.log(error); }
    });
  });
  res.send({redirect: req.fields.blogpost})
});

app.listen(3000, function() {
  console.log('Server is listening to port 3000. Ready to accept requests!');
});

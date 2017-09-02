var express = require('express');
var utility = require('utility');
var app = express();

app.get('/', function (req, res) {
  var q = req.query.q;
  if(!q){
  	res.send("q is not found!");
  } else {

	  var md5Value = utility.md5(q);
	  var sha1Value = utility.sha1(q);

	  res.send("md5:"+md5Value+"</br>sha1:"+sha1Value);
  }
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});

var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();



var catchFirstUrl = 'xxxxxxxxxxxxxxxxxxxxx';
function start() {
  app.get('/', function (req, res, next) {
    superagent.get(catchFirstUrl)
      .end(function (err, sres) {
        if (err) {
          return next(err);
        }
        var $ = cheerio.load(sres.text);
        // console.log($);
        var item = $('#txtUsername-inputEl');
        console.log(item);
        // var items = [];
        // $('#topic_list .topic_title').each(function (idx, element) {
        //   var $element = $(element);
        //   items.push({
        //     title: $element.attr('title'),
        //     href: $element.attr('href')
        //   });
        // });

        res.send(item);
      });
  });


  app.listen(3000, function () {
    console.log('app is listening at port 3000');
  });
}
exports.start = start;
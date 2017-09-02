var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      // $('#topic_list .topic_title').each(function (idx, element) {
      //   var $element = $(element);
      //   items.push({
      //     title: $element.attr('title'),
      //     href: $element.attr('href')
      //   });
      // });
      $('#topic_list .cell').each(function (idx, element) {
        var $element = $(element);
        var strArray = $element.children(".user_avatar").prop("href").split("/")
        var name = $element.children(".user_avatar").prop("href").split("/")[strArray.length -1];
        var title = $element.children(".topic_title_wrapper").children(".topic_title").prop('title');
        var href = $element.children(".topic_title_wrapper").children(".topic_title").prop('href');
        console.log(name+"："+title+":"+href);
        items.push({
          name: name,
          title: title,
          href: href
        });
      });
      console.log("sum:"+items.length);
      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

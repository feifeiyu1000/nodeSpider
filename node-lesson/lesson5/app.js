var async = require('async');
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');


var app = express();
var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, res, next) {
  superagent.get(cnodeUrl)
    .end(function (err, sres) {

      if (err) {
        return console.error(err);
      }
      var topicUrls = [];

      var $ = cheerio.load(sres.text);
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
      });
        var concurrencyCount = 0;
        var fetchUrl = function (url, callback) {
          var delay = parseInt((Math.random() * 10000000) % 2000, 10);
          concurrencyCount++;
          console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
          setTimeout(function () {
            concurrencyCount--;
            callback(null, url + ' html content');
          }, delay);
        };

        // var urls = [];
        // for(var i = 0; i < 30; i++) {
        //   urls.push('http://datasource_' + i);
        // }

        async.mapLimit(topicUrls, 1, function (url, callback) {
          fetchUrl(url, callback);
        }, function (err, result) {
          console.log('final:');
          console.log(result);
        });

       });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
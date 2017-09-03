var express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

// var app = express();

// app.get('/', function (req, resm, next) {
  superagent.get(cnodeUrl)
    .end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      var topicUrls = [];
      // var titleArray = [];
      // var items = [];

      var $ = cheerio.load(res.text);
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
        if(topicUrls.length > 5){
          return false;
        }
        // titleArray.push($element.text().trim());
      });

      var ep = new eventproxy();

      ep.after('topic_html', topicUrls.length, function (topics) {
        topics = topics.map(function (topicPair) {
          var topicUrl = topicPair[0];
          // console.log(topicUrl);
          var topicHtml = topicPair[1];
          // console.log(topicHtml);
          var $ = cheerio.load(topicHtml);
          // console.log($);
          return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim(),
            author1: $('.user_name .dark').text().trim(),
            score: $('.floor .big').text().trim()
          });
        });
        // topics.forEach(function(i,ele){
        // items.push({
        //   // title: titleArray[i],
        //   href: topics.href,
        //   comment1: topics.comment1
        // });
        // });
        console.log('final:');
        console.log(topics);
        
        // resm.send("items:[title:"+topics.title+"href:"+topics.href+"comment1:"+topics.comment1+"]");
      });

      topicUrls.forEach(function (topicUrl) {
        // setInterval(function () {

          superagent.get(topicUrl)
            .end(function (err, res) {
              // console.log("topicUrl:"+topicUrls);
              // console.log('fetch ' + topicUrl + ' successful');
              ep.emit('topic_html', [topicUrl, res.text]);
            });
          // }, 200);
      });
      resm.send(items);
    });
// });


// app.listen(3000, function () {
//   console.log('app is listening at port 3000');
// });

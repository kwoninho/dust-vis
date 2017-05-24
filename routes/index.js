var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('xml2json');
var moment = require('moment');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth';

  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + process.env.service_key; /* Service Key*/
  queryParams += '&' + encodeURIComponent('searchDate') + '=' + encodeURIComponent(moment().format('YYYY-MM-DD')); /* 파라미터설명 */
  request({
      url: url + queryParams,
      method: 'GET'
  }, function (error, response, body) {
      if (error) {
        return res.status(500).send(error);
      }
      var json = JSON.parse(parser.toJson(body));
      var item = json.response.body.items.item[1];
      console.dir(item);
      res.render('index',
      {
        overall: item.informOverall,
        cause: item.informCause,
        grade: item.informGrade,
        img1: item.imageUrl1,
        img2: item.imageUrl2,
        img3: item.imageUrl3,
        img4: item.imageUrl4,
        img5: item.imageUrl5
      });
  });
});

module.exports = router;

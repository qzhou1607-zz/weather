var path = require('path');
var express = require('express');
var zipdb = require('zippity-do-dah');
var forecastIo = require('forecastio');

var weather = new forecastIo(process.env.WEATHER_API_KEY);

var weatherRouter = express.Router();

weatherRouter.route('/')
  .get(function(req,res,next) {
    res.render("index");
  });

weatherRouter.route(/^\/(\d{5})$/)
  .get(function(req,res,next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);

    if(!location.zipcode) {
      next();
      return;
    }

    var lat = location.latitude;
    var long = location.longitude;

    weather.forecast(lat,long,function(err,data) {
      if (err) {
        next();
        return;
      }

      res.json({
        zipcode:zipcode,
        temperature:data.currently.temperature
      });
    });

  });
module.exports = weatherRouter;

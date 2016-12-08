var path = require('path');
var express = require('express');
var dotenv = require('dotenv');
var weatherRouter = require('./modules/temperature.js');
// var zipdb = require('zippity-do-dah');
// var forecastIo = require('forecastio');

dotenv.config();

var app = express();
// var weather = new forecastIo(process.env.WEATHER_API_KEY);

app.use(express.static(path.resolve(__dirname,"public")));

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

// app.get("/", function(req,res,next) {
//   res.render("index");
// });
// app.get(/^\/(\d{5})$/, function(req,res,next) {
//   var zipcode = req.params[0];
//   var location = zipdb.zipcode(zipcode);
//
//   if(!location.zipcode) {
//     next();
//     return;
//   }
//
//   var lat = location.latitude;
//   var long = location.longitude;
//
//   weather.forecast(lat,long,function(err,data) {
//     if (err) {
//       next();
//       return;
//     }
//
//     res.json({
//       zipcode:zipcode,
//       temperature:data.currently.temperature
//     });
//   });
//
// });
app.use('/', weatherRouter);
app.use(function(req,res) {
  res.status(404).render("404");
});

app.listen(3000);

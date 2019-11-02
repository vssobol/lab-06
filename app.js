'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  response.send('Home Page!');
});

app.get('/bad', (req, res) => {
  throw new Error('Not Found');
})

app.get('/about', aboutUsHandler);

function aboutUsHandler(req, res){
  response.status(200).send('This is the about page .html');
}

app.get('*', (req, res) => {
  response.status(404).send('Route does not exist');
})

app.get('/location', (req, res) => {
  try{
    const geoData = require('./data/geo.json');
    const city = req.query.data;
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch(error){
    errorHandler('Something went wrong', req, res);
  }
})

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

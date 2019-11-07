'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home Page!');
});

app.get('/bad', (request, response) => {
  throw new Error('Not Found');
})
app.get('/about', aboutUsHandler);

function aboutUsHandler(request, response){
  response.status(200).send('This is the about page .html');
}

app.get('*', (request, response) => {
  response.status(404).send('Route does not exist');
})

app.get('/location', (request, response) => {
  try{
    const geoData = require('./data/geo.json');
    const city = req.query.data;
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch(error){
    errorHandler('Something went wrong', request, response);
  }
})

app.get('/weather', (request, response) => {
  try{
    const geoData = require('./data/darksky.json').daily.data;
    const city = req.query.data;
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch(error){
    errorHandler('Something went wrong', request, response);
  }
})


function Location(){
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

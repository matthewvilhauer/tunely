// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express'),
    db = require('./models'),
    bodyParser = require('body-parser');
// generate a new express app and call it 'app'
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

//Get all albums
app.get('/api/albums', controllers.albums.index);
// Create a new album
app.post('/api/albums', controllers.albums.create);

// Create a new song
app.post('/api/albums/:id/songs', controllers.songs.create);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

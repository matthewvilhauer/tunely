// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList = [];
albumsList.push({
              artistName: 'Nine Inch Nails',
              name: 'The Downward Spiral',
              releaseDate: '1994, March 8',
              genres: [ 'industrial', 'industrial metal' ]
            });
albumsList.push({
              artistName: 'Metallica',
              name: 'Metallica',
              releaseDate: '1991, August 12',
              genres: [ 'heavy metal' ]
            });
albumsList.push({
              artistName: 'The Prodigy',
              name: 'Music for the Jilted Generation',
              releaseDate: '1994, July 4',
              genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
            });
albumsList.push({
              artistName: 'Johnny Cash',
              name: 'Unchained',
              releaseDate: '1996, November 5',
              genres: [ 'country', 'rock' ]
            });

db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});

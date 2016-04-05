var db = require('../models');


// GET /api/albums/:id/songs
function index(req, res) {

  db.Album.find( function(err, albums){
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(albums);
  });
}

// POST /api/albums/:id/songs
function create(req, res) {

  var newSong = req.body;
  console.log("RECEIVED FROM AJAX: ", newSong);

  db.Album.findOne({_id: newSong.albumId }, function(err, foundAlbum) {
    if (err) {
      res.status(500).json({error: err.message});
    }
    else if (foundAlbum === null) {
      // Is this the same as checking if the foundBook is undefined?
      res.status(404).json({error: "No Album found by this ID"});
    }
    // push req.body into songs array
    foundAlbum.songs.push(req.body);
    // save the album with the new song
    foundAlbum.save(function(err, saved){
      db.Album.find({}, function(err, albums){
        res.status(201).json(albums);
      });
    });
    // send the album back


  });
}

function show(req, res) {

}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};

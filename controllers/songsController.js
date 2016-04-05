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
  console.log('albums create', req.body);
  var newSong = new db.Song(req.body);
  newSong.save(function SongsSaved(err, savedSong) {
    if (err) {
     return console.log(err);
   }
    res.json(savedSong);
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

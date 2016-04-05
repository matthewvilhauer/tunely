/************
 * DATABASE *
 ************/
var db = require('../models');


// GET /api/albums
function index(req, res) {

  db.Album.find( function(err, albums){
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(albums);
  });
}

function create(req, res) {
  console.log('albums create', req.body);
  var newAlbum = new db.Album(req.body);
  newAlbum.save(function AlbumSaved(err, savedAlbum) {
    if (err) {
     return console.log(err);
   }
    res.json(savedAlbum);
  });
}

function show(req, res) {
  // FILL ME IN !
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

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

var AlbumSchema = new Schema({
    name: String,
    artistName: String,
    releaseDate: String,
    genres: Array,
    songs: [SongSchema]
});

var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = require("./song.js");

var AlbumSchema = new Schema({
    name: String,
    artistName: String,
    releaseDate: String,
    genres: Array,
    songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;

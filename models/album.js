var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: String,
    artistName: String,
    releaseDate: Date,
    genres: Array
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;

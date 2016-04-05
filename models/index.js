var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/tunely");

module.exports.Album = require("./album.js");
module.exports.Song = require("./song.js");

/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
 var template;
 var $albumsList;
 var allAlbums;


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

$(document).ready(function() {

  console.log('app.js loaded!');

  $albumsList = $('#albums');

  // compile handlebars template
  var source = $('#album').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleAlbumSuccess,
    error: handleAlbumError
  });

  $('#album-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: createAlbumSuccess,
      error: createAlbumError
    });
  });

  //If the Add Songs button is clicked, activate the modal
  $('#albums').on('click', '.add-song', function(e) {
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#myModal').attr('data-album-id', id);

});

  //On clicking Save, save the song and add it to the Album
  $('#saveSong').on('click', function handleNewSongSubmit(e) {
    e.preventDefault();
    // get data from modal fields
    var songName = $('#songName').val();
    var trackNumber = $('#trackNumber').val();
    var albumId = $('#myModal').attr('data-album-id');//var currentAlbumId;

    myModalData = {
      name: songName,
      trackNumber: trackNumber,
      albumId: albumId
    };

    console.log(myModalData);
    // POST to SERVER
    $.ajax({
      method: 'POST',
      url: '/api/albums/'+$('#myModal').attr('data-album-id')+'/songs',
      data: myModalData,
      success: newSongSuccess,
      error: newSongError
    });
    // clear form
    $('#myModal input').val('');
    // close modal
    $('#myModal').modal('hide');
    // update the correct album to show the new song
  });
  // handleAlbumSuccess(sampleAlbums);
});


// this function takes a single album and renders it to the page
function renderAlbum(album) {

  var $songs = album.songs;

  var songsFormatted = buildSongsHtml($songs);

  console.log('rendering album');
  // $albumsList.empty();
  // pass `allSnippets` into the template function
  var albumHtml = template({ album: album});

  // append html to the view
  $albumsList.prepend(albumHtml);
  $('#add-songs').append(songsFormatted);
}


function handleAlbumSuccess(albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  });
}

function handleAlbumError(e) {
  console.log('uh oh');
  $('#albumTarget').text('Failed to load snippets, is the server working?');
}

function createAlbumSuccess(album) {
    renderAlbum(album);
}

function createAlbumError(e) {
  console.log('uh oh');
  $('#albumTarget').text('Failed to load snippets, is the server working?');
}

function buildSongsHtml(songs) {
  var songText = " &ndash; ";
  songs.forEach(function(song) {
    songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHTML =
"              <li class='list-group-item'>" +
"                <h4 class='inline-header'>Songs:</h4>" +
"                <span>" + songText + "</span>" +
"              </li>";
  return songsHTML;
}

//
// function handleNewSongButtonClick(json) {
//   var album = json;
//   var albumId = album._id;
//
//     for (var index = 0; index < allAlbums.length; index++) {
//         if(allBooks[index]._id === albumId) {
//           // $('#myModal').data('album-id', currentAlbumId);
//           // $('#myModal').modal();
//         }
//     }
//   renderAlbum();
// }

function newSongSuccess(json) {
  console.log("Trying to save a song");
  var albums = json;
  console.log(albums);
  $albumsList.empty();
  handleAlbumSuccess(albums);
}

function newSongError() {
  console.log('adding new song error!');
}

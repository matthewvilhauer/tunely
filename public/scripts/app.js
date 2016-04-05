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
  // handleAlbumSuccess(sampleAlbums);
});


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album');
  // $albumsList.empty();
  // pass `allSnippets` into the template function
  var albumHtml = template({ album: album });

  // append html to the view
  $albumsList.prepend(albumHtml);
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

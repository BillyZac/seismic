var $ = require('jquery')

function photos(latitude, longitude) {
  // get photos associated with the latitude and longitude
    // Put lat and long into a flickr search
    // Receive a list of photos
    // Push up to 12 photo urls into an array photoCollection
    // Append photos to sidebar
  $('.photos').html('')
  var photoCollection = ['url1', 'url2', 'url3']
  for (var i=0; i<photoCollection.length; i++) {
    var newImage = '<img src="' + photoCollection[i] + '"></img>'
    $('.photos').append(newImage)
  }
}

module.exports.photos = photos

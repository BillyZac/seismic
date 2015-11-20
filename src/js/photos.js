var $ = require('jquery')

function photos(i) {
  var newImage = '<img class="image-' + i + '"></img>'
  $('.photos').append(newImage)
}

module.exports.photos = photos

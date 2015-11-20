var $ = require('jquery')

function photos(latitude, longitude) {
  // get photos associated with the latitude and longitude
  console.log(latitude, longitude)
    var flickerAPI = 'https://api.flickr.com/services/rest/'
      + '?method=flickr.photos.search'
      + '&api_key=439d3c788d4c522138a62a1a9faf2f10'
      // + '&tags=earthquake%2C+earthquakes'
      + '&sort=interestingness-desc'
      + '&media=photos'
      + '&lat=' + latitude
      + '&lon=' + longitude
      + '&radius=32&radius_units=km'
      + '&per_page=9&page=1'
      + '&format=json&nojsoncallback=1'
    function displayPhotos(data) {
      console.log(data)
      if (data.photos) {
        var photoHTML = '<ul>'
        $.each(data.photos.photo, function(i,photo) {
          var imgSrc = 'https://farm'
            + photo.farm
            + '.staticflickr.com/'
            + photo.server
            + '/'
            + photo.id
            + '_'
            + photo.secret
            + '.jpg'

          photoHTML += '<li><a href="'
            + '#'
            + '/>'
            + '<img src="'
            + imgSrc
            + '"></a></li>'
        })
        photoHTML += '</ul>'
        $('.photos').html(photoHTML)
      }
    }
    $.getJSON(flickerAPI, displayPhotos);
    // Put lat and long into a flickr search
    // Receive a list of photos
    // Push up to 12 photo urls into an array photoCollection
    // Append photos to sidebar
  // $('.photos').html('').hide()
  // var photoCollection =
  //   ['http://images.usatoday.com/news/_photos/2005/10/08/quake-colombia.jpg',
  //    'http://images-thumbs.thefullwiki.org/1/9/0/1906_San_Francisco_earthquake.png',
  //    'http://nisee.berkeley.edu/thumbnail/3046_1033_1323/IMG0019.jpg',
  //    'http://news.nationalgeographic.com/news/images/thumbs/060413_earthquake_170.jpg']
  // for (var i=0; i<photoCollection.length; i++) {
  //   var newImage = '<img src="' + photoCollection[i] + '"></img>'
  //   $('.photos').append(newImage)
  // }
  // $('.photos').fadeIn(200)
}

function clearPhotos() {
  $('.photos').html('')
}

module.exports.photos = photos
module.exports.clearPhotos = clearPhotos

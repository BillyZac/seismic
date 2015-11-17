var $ = require('jquery')
  $(document).ready(function() {
  function sanityCheck(a, b) {
    // console.log(a, b)
    return a + b
  }
  sanityCheck(1,2)

  var url = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
  function connect(url) {
    $.get(url)
      .done(function(data) {
        var quakes = data.features
        for (var i=0; i<5; i++) {
          console.log(data.features[i].properties.title)
          var title = data.features[i].properties.title
          $('.map').append('<p>' + title + '</p>' )
        }
      })
  }
  // connect(url)

  drawSomething('foo')

  function drawSomething(title) {
      $('.foo').append('<p>Bar</p>')
  }

  module.exports.sanityCheck = sanityCheck
  module.exports.connect = connect
  module.exports.drawSomething = drawSomething
}

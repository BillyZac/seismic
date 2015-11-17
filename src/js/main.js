var $ = require('jquery')

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
      for (var i=0; i<quakes.length; i++) {
        console.log(data.features[i].properties.title)
      }
    })
}
connect(url)


module.exports.sanityCheck = sanityCheck
module.exports.connect = connect
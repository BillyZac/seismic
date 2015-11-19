var $ = require('jquery')
var render = require('./renderStuff.js')

// The size of the global map image
var mapWidth    = 1190
var mapHeight   = 595

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
      var quakesCollection = {
        timeCollected: 0,
        list: []
      }

      for (var i=0; i<quakes.length; i++) {
        var title = quakes[i].properties.title
        // $('body').append('<p>' + title + '</p>' )
        var dataPoint = {
          latitude: quakes[i].geometry.coordinates[1],
          longitude: quakes[i].geometry.coordinates[0],
          radius: quakes[i].properties.sig * 0.07,
          mag: quakes[i].properties.mag,
          place: quakes[i].properties.place,
          time: quakes[i].properties.time
        }

        // Convert map coordinates to screen coordinates
        dataPoint.x =  Math.floor(convertLongitude(dataPoint.longitude))
        dataPoint.y =  Math.floor(convertLatitude(dataPoint.latitude))

        // Put the quake in the quakesCollection
        quakesCollection.list.push(dataPoint)
      }

      // Set the maximum magnitude of quakes to draw
      var maxMagnitude = 5.5
      // Draw all quakes above the specified magnitude
      render.drawAll(quakesCollection, maxMagnitude)

      // Listen for hover over circles. Show more info about the event when hovering.
      $( "circle[data-type='point']" ).hover( function() {
        $mag = $(this).attr('data-mag')
        $('.mag').text($mag)
        $place = $(this).attr('data-place')
        $('.place').text($place)
      })
    })
    .error(function() {
      console.log('Could not connect to USGS.')
    })
}
connect(url)

// render.drawAll()

function convertLongitude(longitude) {
  var x = ( longitude + 180 ) * ( mapWidth / 360 )
  return x
}

function convertLatitude(latitude) {
  // convert from degrees to radians
  var latRad = latitude * Math.PI / 180

  var mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)))
  var y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI))

  return y
}

module.exports.sanityCheck = sanityCheck
module.exports.connect = connect

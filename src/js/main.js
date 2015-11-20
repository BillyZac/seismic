var $ = require('jquery')
var render = require('./renderStuff.js')
var photos = require('./photos.js')

// The size of the global map image
var mapWidth    = 1190
var mapHeight   = 595

function sanityCheck(a, b) {
  // console.log(a, b)
  return a + b
}
sanityCheck(1,2)

var url = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
  + '&minmagnitude=3' // This filters out about 90% of the events, which are not useful for this visualization anyway
  + '&orderby=time-asc' // Allows us to easily animate the display
function connect(url) {
  var quakesCollection = {
    timeCollected: 'never',
    list: []
  }

  if (localStorage.getItem('quakesCollection')) {
    // Get the quakesCollection that was stored in the browser's localStorage on a previous page load
    quakesCollection = JSON.parse(localStorage.getItem('quakesCollection'))
    // Get the timestamp of the cached data, and convert it to a Date object
    var cachedTimeCollected = new Date(quakesCollection.timeCollected)
    // Update with quakesCollection object with the timestamp of the cached data
    quakesCollection.timeCollected = cachedTimeCollected
  }

  $.get(url)
    .done(function(data) {
      // Clear the list of quakes
      quakesCollection.list = []
      console.log('Successfully connected')
      // Timestamp the quakesCollection
      quakesCollection.timeCollected = new Date()
      var quakes = data.features
      console.log('quakes', quakes.length)
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
      localStorage.clear()
      localStorage.setItem('quakesCollection', JSON.stringify(quakesCollection))
    })
    .error(function() {
      console.log('Could not connect to USGS.')
      if (localStorage.getItem('quakesCollection')) {
        quakesCollection = JSON.parse(localStorage.getItem('quakesCollection'))
        console.log(quakesCollection)
      }
    })
    .always(function(APIresponse) {
      // Show notification if cannot connect to API
      if (APIresponse.statusText === 'error') {
        if (quakesCollection.timeCollected === 'never') {
          $('.notifications').text('Could not connect to USGS.')
        } else {
          var cachedTimeCollected = new Date(quakesCollection.timeCollected)
          $('.notifications').text('Could not connect to USGS. Data last collected at '
          + cachedTimeCollected.toLocaleString())
        }
      } else {
        $('.notifications').text('Data collected at ' + quakesCollection.timeCollected.toLocaleString())
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
        $time = $(this).attr('data-time')
        var friendlyTime = $time
        $('.time').text(friendlyTime)
      })

      $('circle').click(function() {
        // When circle is clicked, show photos
        photos.photos($(this).attr('data-time'))

      })

    })
}
connect(url)

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

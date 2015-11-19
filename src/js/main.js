var $ = require('jquery')

// The size of the global map image
var mapWidth    = 1190
var mapHeight   = 595

function sanityCheck(a, b) {
  // console.log(a, b)
  return a + b
}
sanityCheck(1,2)

var url = 'http://XXXearthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
function connect(url) {
  $.get(url)
    .done(function(data) {
      var quakes = data.features
      // console.log(quakes)
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

        if (dataPoint.mag > 5) {
          drawCircle(dataPoint)
        }
      }
      // Listen for hover over circles. Show more info about the event when hovering.
      $( "circle[data-type='point']" ).hover( function() {
        $mag = $(this).attr('data-mag')
        $('.mag').text($mag)
        $place = $(this).attr('data-place')
        $('.place').text($place)
      })
    })
}
connect(url)

function drawCircle(dataPoint) {
  var $svg = $('.map');
  $(SVG('circle'))
    .attr('cx', dataPoint.x)
    .attr('cy', dataPoint.y)
    .attr('r', dataPoint.radius)
    .attr('fill', 'aqua')
    .attr('stroke', 'none')
    .attr('opacity', 0.2)
    .attr('stroke-width', 3)
    .attr('data-type', 'point')
    .attr('data-mag', dataPoint.mag)
    .attr('data-place', dataPoint.place)
    .appendTo($svg)
}

function SVG(tag) {
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

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
module.exports.drawSomething = drawCircle

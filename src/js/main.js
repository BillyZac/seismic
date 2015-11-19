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
      // console.log(quakes)
      for (var i=0; i<quakes.length; i++) {
        var title = quakes[i].properties.title
        // $('body').append('<p>' + title + '</p>' )
        var dataPoint = {
          x: quakes[i].geometry.coordinates[0] * 8,
          y: quakes[i].geometry.coordinates[1] * 8,
          radius: quakes[i].properties.sig * 0.07,
          mag: quakes[i].properties.mag,
          place: quakes[i].properties.place,
          time: quakes[i].properties.time
        }
        if (dataPoint.mag > 5) {
          // console.log(dataPoint)
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
// connect(url)

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

// Testing the plot accuracy
// 39.7642548,-104.9951955
var denver = {
  x: 240,
  y: 160,
  radius: 40,
  mag: 666,
  place: 'Denver',
  time: 'forever'
}

// -37.8589546,144.5191771
var melbourne = {
  x: 1075,
  y: 420,
  radius: 40,
  mag: 666,
  place: 'Melbourse',
  time: 'forever'
}
var zero = {
  x: 0,
  y: 0,
  radius: 30
}
var max = {
  x: 1190,
  y: 595,
  radius: 30
}

drawCircle(denver)
drawCircle(melbourne)
drawCircle(zero)
drawCircle(max)

var mapWidth    = 1190
var mapHeight   = 595
function convert(latitude, longitude) {
  // From: http://stackoverflow.com/questions/14329691/covert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection/14457180#14457180
  var x = ( longitude + 180 ) * ( mapWidth / 360 )

  // convert from degrees to radians
  var latRad = latitude * Math.PI / 180

  // get y value
  var mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)))
  var y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI))

  return [x,y]
}
console.log('melbourne -- Expect x: 1075, y: 420', convert(-37.8589546, 144.5191771))
console.log(convert(39.7642548, -104.9951955))

function convertLongitude(longitude) {
  var x = ( longitude + 180 ) * ( mapWidth / 360 )
  return x
}
// Test convertLongitude()
console.log('Expect convertLongitude(144.5191771) --> 1075: ', convertLongitude(144.5191771))
console.log('Expect convertLongitude(-104.9951955) --> 240: ', convertLongitude(-104.9951955))

function convertLatitude(latitude) {
  // convert from degrees to radians
  var latRad = latitude * Math.PI / 180

  var mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)))
  var y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI))

  return y
}
console.log('Expect convertLatitude(-37.8589546) --> 420: ', convertLatitude(-37.8589546))
console.log('Expect convertLatitude(39.7642548) --> 160: ', convertLatitude(39.7642548))


module.exports.sanityCheck = sanityCheck
module.exports.connect = connect
module.exports.drawSomething = drawCircle

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
        var title = quakes[i].properties.title
        // $('body').append('<p>' + title + '</p>' )
        var dataPoint = {
          x: quakes[i].geometry.coordinates[0] * 8,
          y: quakes[i].geometry.coordinates[1] * 8,
          radius: quakes[i].properties.sig * 0.07,
          mag: quakes[i].properties.mag
        }
        if (dataPoint.mag > 4) {
          console.log(dataPoint)
          drawCircle(dataPoint)
        }
      }
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
    .attr('stroke-width', 1)
    .appendTo($svg)
}

function SVG(tag) {
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

module.exports.sanityCheck = sanityCheck
module.exports.connect = connect
module.exports.drawSomething = drawCircle

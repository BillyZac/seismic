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
      for (var i=0; i<5; i++) {
        console.log(data.features[i].properties.title)
        var title = data.features[i].properties.title
        $('.map').append('<p>' + title + '</p>' )
      }
    })
}
// connect(url)

drawCircle(130, 100, 30)
drawCircle(130, 75, 50)

function drawCircle(x, y, r) {
  var $svg = $('.map');
  $(SVG('circle'))
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('fill', 'none')
    .attr('stroke', 'aqua')
    .attr('stroke-width', 1)
    .appendTo($svg)
}

function SVG(tag) {
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

module.exports.sanityCheck = sanityCheck
module.exports.connect = connect
module.exports.drawSomething = drawCircle

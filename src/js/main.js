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

drawCircle()

function drawCircle() {
  var $svg = $('#mysvg');
  $(SVG('circle'))
    .attr('cx', 130)
    .attr('cy', 75)
    .attr('r', 50)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .appendTo($svg);
}

function SVG(tag) {
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

module.exports.sanityCheck = sanityCheck
module.exports.connect = connect
module.exports.drawSomething = drawCircle

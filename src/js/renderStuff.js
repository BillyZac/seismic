var $ = require('jquery')

// Takes quakesCollection object and draws all quakes above a specified magnitude
function drawAll(quakesCollection, maxMagnitude) {
  for (var i=0; i<quakesCollection.list.length; i++) {
    if (quakesCollection.list[i].mag > maxMagnitude) {
      drawCircle(quakesCollection.list[i])
    }
  }
}

function SVG(tag) {
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

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
  // console.log(dataPoint)
}


module.exports.drawAll = drawAll
module.exports.drawCircle = drawCircle

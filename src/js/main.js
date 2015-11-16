var $ = require('jquery')

function sanityCheck(a, b) {
  console.log(a, b)
  return a + b
}
sanityCheck(1,2)
module.exports.sanityCheck = sanityCheck

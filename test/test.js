var code = require('../src/js/main.js')
var expect = require('chai').expect

describe('Earthquake app', function() {
  it('undefined equals undefined', function() {
    expect(undefined).to.be.undefined
  })

  it('sanity check', function() {
    expect(code.sanityCheck(1,2)).to.equal(3)
  })
})

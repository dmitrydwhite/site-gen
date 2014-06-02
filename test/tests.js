var _ = require('../index');
var chai = require('chai');
var expect = chai.expect;

describe('site-generator', function () {
  it('locates a directory and an index file', function () {
    var input = "test.html";
    expect(_.SnowFrog(input)).to.eql({path:'test.html', template:'test.html/layout.html'});
  });

  it('can open the files in the current directory', function () {
    var input = ".";
    expect(_.SnowFrog(input)).to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                                      template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html'});
  });

});

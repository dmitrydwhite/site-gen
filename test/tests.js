var SnowFrog = require('../index');
var chai = require('chai');
var expect = chai.expect;

describe('site-generator', function () {

  it('can locate the current directory', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                webFiles: ['layout.html', 'secondtest.html', 'test.html']});
  });

  it('recognizes all the files in the current directory', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                webFiles: ['layout.html', 'secondtest.html', 'test.html']});
  });

  it('creates an array of the .html files in the current directory', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                webFiles: ['layout.html', 'secondtest.html', 'test.html']});
  });

});

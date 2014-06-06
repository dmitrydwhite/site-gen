var SnowFrog = require('../lib/index');
var chai = require('chai');
var expect = chai.expect;

describe('site-generator', function () {

  it('can locate the current directory', function (done) {
    var input = ".";
    new SnowFrog(input, "", function(err, result) {
      expect(result).
        to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
        template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
        templateData: ["This is the desired Header\n\n",
          "\n\nThis is the desired footer\n"],
        webContent: 'A bunch of other unique stuff about the second test.\n',
        webFiles: ['secondtest.html', 'test.html'],});
      done();
    });
  });

  it('accepts a variable file for the layout file', function (done) {
    var input1 = ".";
    var input2 = "index.html";
    new SnowFrog(input1, input2, function(err, result) {
      expect(result).
        to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
        template:'index.html',
        templateData: ["INDEX This is the consistent header from INDEX\n\n",
          "\n\nINDEX This is the index footer from INDEX\n"],
        webContent: ['A bunch of other unique stuff about the second test.\n',
          'Unique testing stuff\n'],
        webFiles: ['layout.html', 'secondtest.html', 'test.html'],});
      done();
    });
  });

});

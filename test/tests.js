var SnowFrog = require('../index');
var chai = require('chai');
var expect = chai.expect;

describe('site-generator', function () {

  it.only('can locate the current directory', function (done) {
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

  it('recognizes all the files in the current directory', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                templateData: ["This is the desired Header\n\n",
                  "\n\nThis is the desired footer\n"],
                webFiles: ['secondtest.html', 'test.html']});
  });

  it('creates an array of the .html files in the current directory', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                templateData: ["This is the desired Header\n\n",
                  "\n\nThis is the desired footer\n"],
                webFiles: ['secondtest.html', 'test.html']});
  });

  it('creates a copy of an existing file but with the new template', function () {
    var input = ".";
    expect(new SnowFrog(input)).
                to.eql({path:'/Users/dmitrywhite/pcs/js_immersion/site-gen',
                template:'/Users/dmitrywhite/pcs/js_immersion/site-gen/layout.html',
                templateData: ["This is the desired Header\n\n",
                  "\n\nThis is the desired footer\n"],
                webFiles: ['secondtest.html', 'test.html']});
  });

});

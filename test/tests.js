var SnowForge = require('../index');

describe('site-generator', function () {
  it('locates a directory and an index file', function () {
    var input = "test.html";
    expect(new SnowForge(input)).to.exist;
  });

});

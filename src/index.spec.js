var globallyAvailable = require('./index');

describe('test', function () {
  it('works', function () {
    expect(globallyAvailable(1)).to.equal(2);
  });
});
describe('test', function () {
  it('is a mocha test', function () {
    expect(1).to.be.ok;
    expect(0).to.not.be.ok;
    expect({asfg: [1,2,3]}).to.deep.equal({asfg: [1,3,4]})
  });

  it('is another test', function () {
    expect(globallyAvailable(1)).to.equal(1);
  })
})
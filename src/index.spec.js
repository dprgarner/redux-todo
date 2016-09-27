import indexFunction from './index';

describe('babel', function () {
  it('compiles es6', function () {
    expect(indexFunction).to.be.ok;
    expect(indexFunction(1)).to.equal(2);
  });

  it('compiles spread operators', function () {
    let obj = {a: 1, b: 2};
    expect({...obj, c: 3}).to.deep.equal({
      a: 1,
      b: 2,
      c: 3,
    })
  })
});
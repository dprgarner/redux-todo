import app from '.';

describe('babel', function () {
  it('adds a button', function () {
    expect($('button')).to.have.length(0);
    app();
    expect($('button')).to.have.length(1);
  });
});
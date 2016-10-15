import app from '.';

describe('base app', function () {
  beforeEach(function () {
    this.$fixture = $('<main>').appendTo('body');
    app('main');
  });

  afterEach(function () {
    this.$fixture.empty();
  });

  it('adds todos when the button is clicked', function () {
    expect($('ul li')).to.have.length(0);
    $('input').val('Hello world!');
    $('button').click();
    expect($('ul li')).to.have.length(1);
    expect($('ul li').text()).to.equal('Hello world!');
  });
});
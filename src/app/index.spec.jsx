import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import App from '.';
import reducer from './reducer';

describe('App', function () {
  beforeEach(function () {
    let store = createStore(reducer);

    this.app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    this.input = this.app.find('input[type="text"]').get(0);
    this.button = this.app.find('button').get(0);
    this.getTodos = () => this.app.find('li');

    expect(this.getTodos()).to.have.length(0);
  });

  it('adds todos when the button is clicked', function () {
    this.input.value = 'Hello world!';
    this.button.click();

    expect(this.getTodos()).to.have.length(1);
    expect(this.getTodos().text()).to.equal('Hello world!');
  });

  it('clears the text box when the button is clicked', function () {
    this.input.value = 'Hello world!';
    this.button.click();

    expect(this.input.value).to.equal('');
  });

  it('does not submit whitespace', function () {
    this.input.value = '      ';
    this.button.click();

    expect(this.app.find('li')).to.have.length(0);
    expect(this.input.value).to.not.equal('');
  });
});
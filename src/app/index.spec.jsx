import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import App from '.';
import {Todo} from './Todos'
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
    this.getTodos = () => this.app.find(Todo);

    this.all = this.app.find('li').get(0);
    this.incomplete = this.app.find('li').get(1);
    this.complete = this.app.find('li').get(2);

    expect(this.getTodos()).to.have.length(0);
  });

  describe('AddTodo', () => {
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

      expect(this.getTodos()).to.have.length(0);
      expect(this.input.value).to.not.equal('');
    });
  });

  describe('Toggle', function () {
    it('toggles todos on click', function () {
      this.input.value = 'Hello world!';
      this.button.click();

      let todo = this.getTodos();
      expect(todo.prop('active')).to.be.true;

      todo.simulate('click');
      expect(todo.prop('active')).to.be.false;

      todo.simulate('click');
      expect(todo.prop('active')).to.be.true;
    });
  });

  describe('FilterTodos', function () {
    it.skip('filters to incomplete todos', function () {
      this.input.value = 'Done!';
      this.button.click();
      this.getTodos().simulate('click');

      this.input.value = 'Not Done!';
      this.button.click();

      this.incomplete.click()

      expect(this.getTodos().at(0).text()).to.equal('Not Done!');
    });
  });
});
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import App from '.';
import {Todo} from './Todos'
import FilterTodos from './FilterTodos'
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

    let filterTodos = this.app.find(FilterTodos);
    this.all = filterTodos.find('li').at(0);
    this.incomplete = filterTodos.find('li').at(1);
    this.complete = filterTodos.find('li').at(2);

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
    it('filters to incomplete todos', function () {
      this.input.value = 'Done!';
      this.button.click();
      this.getTodos().simulate('click');
      this.input.value = 'Not Done!';
      this.button.click();

      this.incomplete.simulate('click');

      expect(this.getTodos()).to.have.length(1);
      expect(this.getTodos().at(0).text()).to.equal('Not Done!');
    });

    it('filters to complete todos', function () {
      this.input.value = 'Done!';
      this.button.click();
      this.getTodos().simulate('click');
      this.input.value = 'Not Done!';
      this.button.click();

      this.complete.simulate('click');

      expect(this.getTodos()).to.have.length(1);
      expect(this.getTodos().at(0).text()).to.equal('Done!');
    });

    it('filters to all todos', function () {
      this.input.value = 'Done!';
      this.button.click();
      this.getTodos().simulate('click');
      this.input.value = 'Not Done!';
      this.button.click();

      this.complete.simulate('click');
      this.all.simulate('click');

      expect(this.getTodos()).to.have.length(2);
      expect(this.getTodos().at(0).text()).to.equal('Done!');
      expect(this.getTodos().at(1).text()).to.equal('Not Done!');
    });
  });
});
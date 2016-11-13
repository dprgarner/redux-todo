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

    this.isSelected = (el) => (
      el.props().style.textDecoration === 'underline'
    );

    expect(this.getTodos()).to.have.length(0);
  });

  it('adds todos when text is entered', function () {
    this.input.value = 'Hello world!';
    this.button.click();

    expect(this.getTodos()).to.have.length(1);
    expect(this.getTodos().text()).to.equal('Hello world!');
  });

  it('toggles todos on click', function () {
    this.input.value = 'Hello world!';
    this.button.click();

    let todo = this.getTodos();
    expect(todo.prop('completed')).to.be.false;

    todo.simulate('click');
    expect(todo.prop('completed')).to.be.true;

    todo.simulate('click');
    expect(todo.prop('completed')).to.be.false;
  });

  it('filters todos based on whether they are completed', function () {
    let visibleTodos = () => (
      this.getTodos().map((todo) => todo.text())
    );

    this.input.value = 'Done!';
    this.button.click();
    this.getTodos().simulate('click');
    this.input.value = 'Not Done!';
    this.button.click();

    expect(visibleTodos()).to.deep.equal(['Done!', 'Not Done!']);

    this.incomplete.simulate('click');
    expect(visibleTodos()).to.deep.equal(['Not Done!']);
    expect(this.isSelected(this.all)).to.be.false;
    expect(this.isSelected(this.incomplete)).to.be.true;
    expect(this.isSelected(this.complete)).to.be.false;

    this.complete.simulate('click');
    expect(visibleTodos()).to.deep.equal(['Done!']);
    expect(this.isSelected(this.all)).to.be.false;
    expect(this.isSelected(this.incomplete)).to.be.false;
    expect(this.isSelected(this.complete)).to.be.true;

    this.all.simulate('click');
    expect(visibleTodos()).to.deep.equal(['Done!', 'Not Done!']);
    expect(this.isSelected(this.all)).to.be.true;
    expect(this.isSelected(this.incomplete)).to.be.false;
    expect(this.isSelected(this.complete)).to.be.false;
  });
});
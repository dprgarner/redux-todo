import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import sinon from 'sinon';

import {FILTER_ALL, FILTER_COMPLETE, FILTER_INCOMPLETE} from './constants';
import {Todo, Todos} from './Todos';

describe('Todo', function () {
  beforeEach(function () {
    this.props = {
      text: 'Todo Text',
      onClick: sinon.spy(),
      completed: false,
    }
    this.createTodo = (props) => shallow(
      <Todo {...props} />
    );
  });

  it('renders the text', function () {
    let todo = this.createTodo(this.props);
    expect(todo.text()).to.equal(this.props.text);
  });

  it('is crossed out if completed', function () {
    let todo = this.createTodo({...this.props, completed: true});
    expect(todo.props().style.textDecoration).to.equal('line-through');
  });

  it('is not crossed out if not completed', function () {
    let todo = this.createTodo({...this.props, completed: false});
    expect(todo.props().style.textDecoration).to.not.be.ok;
  });

  it('calls onClick callback prop if clicked', function () {
    let todo = this.createTodo(this.props);
    expect(this.props.onClick.called).to.be.false;

    todo.simulate('click');
    expect(this.props.onClick.called).to.be.true;
  });
});

describe('Todos', function () {
  beforeEach(function () {
    this.props = {
      filter: FILTER_ALL,
      todos: [
        {
          id: 0,
          text: 'Incomplete',
          completed: false,
        },
        {
          id: 1,
          text: 'Complete',
          completed: true,
        },
      ],
      onTodoClick: sinon.spy(),
    };
    this.createTodos = (props) => {
      return shallow(
        <Todos {...props}/>
      );
    };
  });

  it('filters to all todos', function () {
    let todos = this.createTodos({...this.props, filter: FILTER_ALL});
    expect(todos.find(Todo)).to.have.length(2);
    expect(todos.find(Todo).at(0).props().id).to.equal(0);
    expect(todos.find(Todo).at(1).props().id).to.equal(1);
  });

  it('filters to completed todos', function () {
    let todos = this.createTodos({...this.props, filter: FILTER_COMPLETE});
    expect(todos.find(Todo)).to.have.length(1);
    expect(todos.find(Todo).at(0).props().id).to.equal(1);
  });

  it('filters to incompleted todos', function () {
    let todos = this.createTodos({...this.props, filter: FILTER_INCOMPLETE});
    expect(todos.find(Todo)).to.have.length(1);
    expect(todos.find(Todo).at(0).props().id).to.equal(0);
  });

  it('calls onTodoClick with the ID of the todo', function () {
    let todos = this.createTodos(this.props);
    let spy = this.props.onTodoClick;
    expect(spy.called).to.be.false;

    todos.find(Todo).at(1).props().onClick();
    expect(spy.lastCall.args).to.deep.equal([1]);
  });
});
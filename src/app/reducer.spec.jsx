import deepFreeze from 'deep-freeze';

import {addTodo, toggleTodo} from './actions';
import reducer from './reducer';

describe('reducer', function () {
  it('can add a todo to an empty list', function () {
    let state = {todos: []};
    let action = addTodo('hi');
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }]
    });
  });

  it('can add a todo to a list with todos', function () {
    let state = {
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }],
    };
    let action = addTodo('bi');
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }, {
        id: 1,
        text: 'bi',
        active: true,
      }],
    });
  });

  it('can toggle a todo on', function () {
    let state = {
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }, {
        id: 1,
        text: 'bi',
        active: false,
      }],
    };
    let action = toggleTodo(1);
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }, {
        id: 1,
        text: 'bi',
        active: true,
      }],
    });
  });

  it('can toggle a todo off', function () {
    let state = {
      todos: [{
        id: 0,
        text: 'hi',
        active: true,
      }, {
        id: 1,
        text: 'bi',
        active: false,
      }],
    };
    let action = toggleTodo(0);
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
        active: false,
      }, {
        id: 1,
        text: 'bi',
        active: false,
      }],
    });
  });
});
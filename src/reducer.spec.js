import deepFreeze from 'deep-freeze';

import reducer from './reducer';

describe('reducer', function () {
  it('can add a todo', function () {
    let state = {todos: []};
    let action = {
      type: 'ADD_TODO',
      text: 'hi',
    };
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
      }]
    });
  });

  it('can add two todos', function () {
    let state = {
      todos: [{
        id: 0,
        text: 'hi',
      }],
    };
    let action = {
      type: 'ADD_TODO',
      text: 'bi',
    };
    deepFreeze(state);

    expect(reducer(state, action)).to.deep.equal({
      todos: [{
        id: 0,
        text: 'hi',
      }, {
        id: 1,
        text: 'bi',
      }],
    });
  });
});
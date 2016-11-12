import deepFreeze from 'deep-freeze';

import * as actions from './actions'
import reducer from './reducer';

function theReducer(test, action, initialState, finalState) {
  it(test, () => {
    deepFreeze(action);
    deepFreeze(initialState);
    deepFreeze(finalState);
    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });
}

describe('reducer', () => {
  describe('addTodo', () => {
    theReducer(
      'adds a todo to an empty list',
      actions.addTodo('hi'),
      {todos: []},
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
        ],
      }
    );

    theReducer(
      'adds a todo to a list with todos',
      actions.addTodo('bi'),
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
        ],
      },
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
          {
            id: 1,
            text: 'bi',
            active: true,
          },
        ],
      },
    )
  });

  describe('toggleTodo', () => {
    theReducer(
      'toggles a todo on',
      actions.toggleTodo(1),
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
          {
            id: 1,
            text: 'bi',
            active: false,
          },
        ],
      },
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
          {
            id: 1,
            text: 'bi',
            active: true,
          },
        ],
      }
    );

    theReducer(
      'toggles a todo off', 
      actions.toggleTodo(0),
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
          {
            id: 1,
            text: 'bi',
            active: false,
          },
        ],
      },
      {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: false,
          },
          {
            id: 1,
            text: 'bi',
            active: false,
          },
        ],
      }
    );
  });
});
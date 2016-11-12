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
      {
        filter: 'ALL',
        todos: [],
      },
      {
        filter: 'ALL',
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
        filter: 'ALL',
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
        ],
      },
      {
        filter: 'ALL',
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
        filter: 'ALL',
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
        filter: 'ALL',
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
        filter: 'ALL',
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
        filter: 'ALL',
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

  describe('FilterTodo', () => {
    theReducer(
      'switches the filter state to show all',
      actions.filterAll(),
      {
        filter: 'INCOMPLETE',
        todos: [],
      },
      {
        filter: 'ALL',
        todos: [],
      }
    );

    theReducer(
      'switches the filter state to show incomplete',
      actions.filterIncomplete(),
      {
        filter: 'ALL',
        todos: [],
      },
      {
        filter: 'INCOMPLETE',
        todos: [],
      }
    );

    theReducer(
      'switches the filter state to show complete',
      actions.filterComplete(),
      {
        filter: 'ALL',
        todos: [],
      },
      {
        filter: 'COMPLETE',
        todos: [],
      }
    );
  })
});
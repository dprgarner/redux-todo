import deepFreeze from 'deep-freeze';

import * as actions from './actions'
import reducer, {todos, filter} from './reducer';

function todoReducer(test, action, initialState, finalState) {
  it(test, () => {
    deepFreeze(action);
    deepFreeze(initialState);
    deepFreeze(finalState);
    expect(todos(initialState, action)).to.deep.equal(finalState);
  });
}
function filterReducer(test, action, initialState, finalState) {
  it(test, () => {
    deepFreeze(action);
    expect(filter(initialState, action)).to.deep.equal(finalState);
  });
}

describe('reducer', () => {
  describe('addTodo', () => {
    todoReducer(
      'adds a todo to an empty list',
      actions.addTodo('hi'),
      [],
      [
        {
          id: 0,
          text: 'hi',
          active: true,
        },
      ]
    );

    todoReducer(
      'adds a todo to a list with todos',
      actions.addTodo('bi'),
      [
        {
          id: 0,
          text: 'hi',
          active: true,
        },
      ],
      [
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
    )
  });

  describe('toggleTodo', () => {
    todoReducer(
      'toggles a todo on',
      actions.toggleTodo(1),
      [
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
      [
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
    );

    todoReducer(
      'toggles a todo off', 
      actions.toggleTodo(0),
      [
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
      [
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
    );
  });

  describe('FilterTodo', () => {
    filterReducer(
      'switches the filter state to show all',
      actions.filterAll(),
      'INCOMPLETE',
      'ALL',
    );

    filterReducer(
      'switches the filter state to show incomplete',
      actions.filterIncomplete(),
      'ALL',
      'INCOMPLETE',
    );

    filterReducer(
      'switches the filter state to show complete',
      actions.filterComplete(),
      'ALL',
      'COMPLETE',
    );
  })
});
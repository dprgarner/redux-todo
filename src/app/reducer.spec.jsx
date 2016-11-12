import deepFreeze from 'deep-freeze';

import * as actions from './actions'
import {FILTER_ALL, FILTER_INCOMPLETE, FILTER_COMPLETE} from './constants';
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
          completed: false,
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
          completed: false,
        },
      ],
      [
        {
          id: 0,
          text: 'hi',
          completed: false,
        },
        {
          id: 1,
          text: 'bi',
          completed: false,
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
          completed: false,
        },
        {
          id: 1,
          text: 'bi',
          completed: true,
        },
      ],
      [
        {
          id: 0,
          text: 'hi',
          completed: false,
        },
        {
          id: 1,
          text: 'bi',
          completed: false,
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
          completed: false,
        },
        {
          id: 1,
          text: 'bi',
          completed: true,
        },
      ],
      [
        {
          id: 0,
          text: 'hi',
          completed: true,
        },
        {
          id: 1,
          text: 'bi',
          completed: true,
        },
      ],
    );
  });

  describe('FilterTodo', () => {
    filterReducer(
      'switches the filter state to show all',
      actions.filterAll(),
      FILTER_INCOMPLETE,
      FILTER_ALL,
    );

    filterReducer(
      'switches the filter state to show incomplete',
      actions.filterIncomplete(),
      FILTER_ALL,
      FILTER_INCOMPLETE,
    );

    filterReducer(
      'switches the filter state to show complete',
      actions.filterComplete(),
      FILTER_ALL,
      FILTER_COMPLETE,
    );
  })
});
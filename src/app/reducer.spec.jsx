import deepFreeze from 'deep-freeze';

import * as actions from './actions'
import reducer from './reducer';

describe('reducer', () => {
  describe('addTodo', () => {
    it('can add a todo to an empty list', () => {
      let state = {todos: []};
      let action = actions.addTodo('hi');
      deepFreeze(state);
      deepFreeze(action);

      expect(reducer(state, action)).to.deep.equal({
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
        ],
      });
    });

    it('can add a todo to a list with todos', () => {
      let state = {
        todos: [
          {
            id: 0,
            text: 'hi',
            active: true,
          },
        ],
      };
      let action = actions.addTodo('bi');
      deepFreeze(state);
      deepFreeze(action);

      expect(reducer(state, action)).to.deep.equal({
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
      });
    });
  });

  describe('toggleTodo', () => {
    it('can toggle a todo on', () => {
      let state = {
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
      };
      let action = actions.toggleTodo(1);
      deepFreeze(action);
      deepFreeze(state);

      expect(reducer(state, action)).to.deep.equal({
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
      });
    });

    it('can toggle a todo off', () => {
      let state = {
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
      };
      let action = actions.toggleTodo(0);
      deepFreeze(state);
      deepFreeze(action);

      expect(reducer(state, action)).to.deep.equal({
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
      });
    });
  });
});
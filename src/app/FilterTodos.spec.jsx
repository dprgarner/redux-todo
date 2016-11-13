import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import sinon from 'sinon';

import FilterTodos, {FilterTodo} from './FilterTodos';
import {filterAll, filterIncomplete, filterComplete} from './actions'
import {FILTER_ALL, FILTER_INCOMPLETE, FILTER_COMPLETE} from './constants';

const mockStore = (state) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: sinon.spy(),
  getState: () => ({...state}),
});

describe('FilterTodos', function () {
  beforeEach(function () {
    this.filterTodos = shallow(<FilterTodos />);
  });

  it('mounts three FilterTodo tags', function () {
    expect(this.filterTodos.find(FilterTodo)).to.have.length(3);
    let props = _.map([0, 1, 2], (i) => (
      this.filterTodos.find(FilterTodo).at(i).props()
    ));

    for (let i = 0; i < 3; i++)
      expect(props[i]).to.have.keys('action', 'type', 'text');

    expect(props[0]).to.contain({
      type: FILTER_ALL,
      text: 'All',
    });
    expect(props[1]).to.contain({
      type: FILTER_INCOMPLETE,
      text: 'Incomplete',
    });
    expect(props[2]).to.contain({
      type: FILTER_COMPLETE,
      text: 'Complete',
    });
  });
});

describe('FilterTodo', function () {
  beforeEach(function () {
    this.propsAll = {
      type: FILTER_ALL,
      text: 'All',
      action: filterAll,
    };
    this.propsIncomplete = {
      type: FILTER_INCOMPLETE,
      text: 'Incomplete',
      action: filterIncomplete,
    };
    this.stateAll = {filter: FILTER_ALL};
    this.stateIncomplete = {filter: FILTER_INCOMPLETE};

    this.createFilterTodo = (state, props) => {
      let store = mockStore(state);
      this.dispatch = store.dispatch;
      return mount(
        <Provider store={store}>
          <FilterTodo {...props} />
        </Provider>
      ).find(FilterTodo);
    }
    this.isUnderlined = (filterTodo) => (
      filterTodo.find('li').props().style.textDecoration === 'underline'
    );
  });

  it('dispatches the action on click', function () {
    let filterTodo = this.createFilterTodo(this.stateAll, this.propsAll);
    expect(this.dispatch.called).to.be.false;

    filterTodo.simulate('click');

    expect(this.dispatch.called).to.be.true;
    expect(this.dispatch.lastCall.args[0]).to.deep.equal(filterAll());
  });

  it('is underlined if the state matches the type prop', function () {
    let filterTodo1 = this.createFilterTodo(this.stateAll, this.propsAll);
    let filterTodo2 = this.createFilterTodo(
      this.stateIncomplete, this.propsIncomplete
    );
    expect(this.isUnderlined(filterTodo1)).to.be.true;
    expect(this.isUnderlined(filterTodo2)).to.be.true;
  });

  it('is not underlined if the state and type prop are different', function () {
    let filterTodo1 = this.createFilterTodo(this.stateAll, this.propsIncomplete);
    let filterTodo2 = this.createFilterTodo(this.stateIncomplete, this.propsAll);
    expect(this.isUnderlined(filterTodo1)).to.be.false;
    expect(this.isUnderlined(filterTodo2)).to.be.false;
  });
});

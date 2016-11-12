import _ from 'lodash';
import {connect} from 'react-redux';

import {filterAll, filterIncomplete, filterComplete} from './actions';

let filters = [
  {
    type: 'ALL',
    text: 'All',
    action: filterAll,
  },
  {
    type: 'INCOMPLETE',
    text: 'Incomplete',
    action: filterIncomplete,
  },
  {
    type: 'COMPLETE',
    text: 'Complete',
    action: filterComplete,
  },
];

const mapStateToProps = (state, ownProps) => ({
  selected: state.filter === ownProps.type,
});

let FilterTodo = ({dispatch, text, action, selected}) => {
  let liStyle = {
    display: 'inline-block',
    marginRight: '20px',
  };
  if (selected) liStyle.textDecoration = 'underline';

  return (
    <li style={liStyle} onClick={() => {dispatch(action())}}>
      {text}
    </li>
  )
};
FilterTodo = connect(mapStateToProps)(FilterTodo);

const FilterTodos = () => (
  <ul style={{listStyle: 'none', padding: 0}}>
    {
      _.map(filters, (filter) => (
        <FilterTodo key={filter.type} {...filter} />
      ))
    }
  </ul>
);

export default FilterTodos;
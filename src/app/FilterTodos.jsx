import _ from 'lodash';
import {connect} from 'react-redux';

import {filterAll, filterIncomplete, filterComplete} from './actions';

let filters = {
  'ALL': {
    text: 'All',
    action: filterAll,
  },
  'INCOMPLETE': {
    text: 'Incomplete',
    action: filterIncomplete,
  },
  'COMPLETE': {
    text: 'Complete',
    action: filterComplete,
  },
}

const FilterTodos = ({dispatch}) => {
  let ulStyle = {listStyle: 'none', padding: 0};
  let liStyle = {display: 'inline-block', marginRight: '20px'};

  return (
    <ul style={ulStyle}>
      {
        _.map(filters, (value, key) => (
          <li key={key} style={liStyle} onClick={() => {dispatch(value.action())}}>
            {value.text}
          </li>
        ))
      }
    </ul>
  )
};

export default connect()(FilterTodos);
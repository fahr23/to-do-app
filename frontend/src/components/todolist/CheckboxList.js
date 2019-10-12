import React from 'react';
import List from '@material-ui/core/List';
import CheckboxListItem from './CheckboxListItem';

const CheckboxList = props => (
  <div>
    <List>
      {Object.keys(props.items).sort(key => props.items[key].completed).map((key, index) => {      	
        return (<CheckboxListItem key={key} id={key} item={props.items[key]} {...props}/>);
      })}
    </List>
  </div>
)

export default CheckboxList;
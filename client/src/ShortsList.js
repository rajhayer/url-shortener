import React from 'react';
import ListItem from './ListItem.js';

function ShortsList(props) {
  return (
    <div className='output-panel'>
      {props.urls.map(url => <ListItem key={url.origUrl} output={url} />)}
    </div>
  );
}

export default ShortsList;